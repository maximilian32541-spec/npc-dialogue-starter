const { validateConfig, validateNPCId } = require('../validation');

describe('validateConfig', () => {
  it('should pass with valid config', () => {
    const result = validateConfig({ apiEndpoint: 'http://test', apiKey: 'key', model: 'gpt-4' });
    expect(result.valid).toBe(true);
  });

  it('should fail without apiEndpoint', () => {
    const result = validateConfig({ apiKey: 'key', model: 'gpt-4' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('apiEndpoint is required');
  });
});

describe('validateNPCId', () => {
  it('should pass with known NPC', () => {
    const result = validateNPCId('merchant', { merchant: {} });
    expect(result.valid).toBe(true);
  });

  it('should fail with unknown NPC', () => {
    const result = validateNPCId('dragon', { merchant: {} });
    expect(result.valid).toBe(false);
  });
});
