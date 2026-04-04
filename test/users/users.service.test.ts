
import { getUsers } from '../../src/users/users.service';

describe('getUsers', () => {
  it('returns a list of users', () => {
    const result = getUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('each user has id, name, and email', () => {
    const result = getUsers();
    for (const user of result) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    }
  });
});
