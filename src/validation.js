function validateConfig(config) {
  const errors = [];
  if (!config.apiEndpoint) errors.push('apiEndpoint is required');
  if (!config.apiKey) errors.push('apiKey is required');
  if (!config.model) errors.push('model is required');
  return { valid: errors.length === 0, errors };
}

function validateNPCId(npcId, profiles) {
  if (!npcId || typeof npcId !== 'string') return { valid: false, error: 'npcId must be a string' };
  if (profiles && !profiles[npcId]) return { valid: false, error: `Unknown NPC: ${npcId}` };
  return { valid: true };
}

module.exports = { validateConfig, validateNPCId };
