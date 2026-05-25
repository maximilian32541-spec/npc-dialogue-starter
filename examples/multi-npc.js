// Multi-NPC conversation simulation
const { DialogueManager } = require('../src/dialogue');
const { ContextBuilder } = require('../src/context');

const dm = new DialogueManager({
  apiEndpoint: process.env.LLM_API_URL,
  apiKey: process.env.LLM_API_KEY,
  model: 'gpt-4o-mini',
});

async function simulateConversation() {
  const npcs = ['merchant', 'guard'];
  const topics = ['A stranger entered the town', 'There is a dragon sighting nearby'];

  for (const topic of topics) {
    console.log(`\n--- Topic: ${topic} ---`);
    for (const npc of npcs) {
      const ctx = ContextBuilder.build(npc, topic);
      const reply = await dm.generate(npc, ctx);
      console.log(`${npc}: ${reply.text}`);
    }
  }
}

simulateConversation().catch(console.error);
