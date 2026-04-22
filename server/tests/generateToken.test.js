const generateToken = require('../src/utils/generateToken');

describe('generateToken utility', () => {
  it('should generate a valid JWT token', () => {
    const userId = '507f1f77bcf86cd799439011';
    const token = generateToken(userId);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
  });

  it('should generate different tokens for different user IDs', () => {
    const token1 = generateToken('507f1f77bcf86cd799439011');
    const token2 = generateToken('507f1f77bcf86cd799439012');

    expect(token1).not.toBe(token2);
  });

  it('should generate tokens with correct structure', () => {
    const userId = '507f1f77bcf86cd799439011';
    const token = generateToken(userId);

    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    expect(payload).toHaveProperty('_id', userId);
  });
});
