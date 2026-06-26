import { EventBridgeEvent } from 'aws-lambda';

export const eventBridgeProducts = async (event: EventBridgeEvent<string, unknown>): Promise<void> => {
  console.log(JSON.stringify(event, null, 2));
};
