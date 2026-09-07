import { PostAuthenticationTriggerEvent } from 'aws-lambda';
import axios from 'axios';

// Native sign-in keeps Username as the email itself (see auth.service.ts's
// SignUpCommand); federated users get "<ProviderName>_<providerUserId>".
const isNativeUsername = (username: string, email: string): boolean =>
  username.toLowerCase() === email.toLowerCase();

const syncUserWithBackend = async (event: PostAuthenticationTriggerEvent): Promise<void> => {
  const { sub, email, name } = event.request.userAttributes;

  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/api/users/cognito-trigger`, {
      triggerSource: event.triggerSource,
      userPoolId: event.userPoolId,
      userName: event.userName,
      request: {
        userAttributes: { sub, email, name },
      },
    });

    console.log(
      'Post authentication sync forwarded successfully for user:',
      event.userName,
      response.data,
    );
  } catch (error) {
    // Non-blocking: this runs on every login, so a backend hiccup must not lock the user out.
    console.error('Error forwarding post authentication sync for user:', event.userName, error);
  }
};

export const postAuthentication = async (
  event: PostAuthenticationTriggerEvent,
): Promise<PostAuthenticationTriggerEvent> => {
  console.log('Post authentication event received:', event);
  const { email, 'custom:id': dbId } = event.request.userAttributes;
  const isFederatedUser = Boolean(email) && !isNativeUsername(event.userName, email);

  // Post Confirmation never fires for federated sign-ins, so the first
  // Google login (no custom:id yet, meaning the backend never saw this user) is
  // synced here instead. Subsequent logins already have custom:id and are skipped.
  if (isFederatedUser && !dbId) {
    await syncUserWithBackend(event);
  }

  return event;
};
