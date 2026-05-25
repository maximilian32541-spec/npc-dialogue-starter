const { ContextBuilder } = require('./src/context');

// Test context building
const ctx = ContextBuilder.build('merchant', 'What do you have for sale?');
console.assert(ctx.systemPrompt.includes('Goron'), 'NPC name should be in prompt');
console.assert(ctx.systemPrompt.includes('haggling'), 'Personality should be in prompt');
console.assert(ctx.playerMessage === 'What do you have for sale?', 'Player message preserved');

const ctx2 = ContextBuilder.build('unknown_npc', 'Hello');
console.assert(ctx2.systemPrompt.includes('villager'), 'Unknown NPC should fallback');

console.log('All tests passed.');
