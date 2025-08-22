import { mockValidateEmail } from '../src/services/validator.js';

describe('Mock Email Validator', () => {
  it('should validate a proper email', async () => {
    const result = await mockValidateEmail('user@example.com');
    expect(result.valid).toBe(true);
  });

  it('should reject an invalid email', async () => {
    const result = await mockValidateEmail('invalid-email');
    expect(result.valid).toBe(false);
  });
});
