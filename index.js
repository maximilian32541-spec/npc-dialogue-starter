const { DialogueManager } = require('./src/dialogue');
const { ContextBuilder } = require('./src/context');

const dm = new DialogueManager({
  apiEndpoint: process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions',
  apiKey: process.env.LLM_API_KEY,
  model: process.env.LLM_MODEL || 'gpt-4o-mini',
});

async function talk(npcId, playerMessage) {
  const context = ContextBuilder.build(npcId, playerMessage);
  const response = await dm.generate(npcId, context);
  return response;
}

module.exports = { talk, DialogueManager, ContextBuilder };
