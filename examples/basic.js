// Basic NPC dialogue example
const { talk } = require('../index');

async function main() {
  console.log('=== Merchant Dialogue ===');

  const reply1 = await talk('merchant', 'Hello, what do you have today?');
  console.log(`Goron: ${reply1.text}`);
  console.log(`  [emotion: ${reply1.emotion}]`);

  const reply2 = await talk('merchant', 'Do you have any rare swords?');
  console.log(`Goron: ${reply2.text}`);
  console.log(`  [emotion: ${reply2.emotion}]`);

  console.log('\n=== Guard Dialogue ===');
  const reply3 = await talk('guard', 'What is the current threat level?');
  console.log(`Captain Elara: ${reply3.text}`);
}

main().catch(console.error);
