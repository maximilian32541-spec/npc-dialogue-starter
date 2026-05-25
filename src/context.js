const NPC_PROFILES = {
  merchant: {
    name: 'Goron',
    personality: 'A friendly dwarven merchant who loves haggling. Speaks with enthusiasm about rare goods.',
    location: 'Marketplace',
    knowledge: ['prices', 'rare items', 'local rumors'],
  },
  guard: {
    name: 'Captain Elara',
    personality: 'A stern but fair city guard captain. Direct and professional.',
    location: 'City Gate',
    knowledge: ['laws', 'threats', 'city defense'],
  },
};

class ContextBuilder {
  static build(npcId, playerMessage) {
    const profile = NPC_PROFILES[npcId] || { name: 'NPC', personality: 'A villager.', location: 'Unknown', knowledge: [] };
    const systemPrompt = [
      `You are ${profile.name}, ${profile.personality}`,
      `Location: ${profile.location}`,
      `You know about: ${profile.knowledge.join(', ')}`,
      'Respond in character. Keep replies under 3 sentences.',
      'Use [emotion:happy/sad/angry/neutral] and [action:wave/point/nod] tags when appropriate.',
    ].join('\n');

    return { systemPrompt, playerMessage };
  }
}

module.exports = { ContextBuilder };
