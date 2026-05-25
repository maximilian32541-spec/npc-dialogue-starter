const { RateLimiter } = require('../rateLimiter');

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.log(`  ✗ ${name}: ${e.message}`);
    process.exitCode = 1;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

console.log('RateLimiter:');

test('allows requests under limit', () => {
  const limiter = new RateLimiter({ maxRequests: 3, windowMs: 60000 });
  assert(limiter.allow('npc1').allowed === true);
  assert(limiter.allow('npc1').allowed === true);
  assert(limiter.allow('npc1').allowed === true);
});

test('blocks requests over limit', () => {
  const limiter = new RateLimiter({ maxRequests: 2, windowMs: 60000 });
  limiter.allow('npc1');
  limiter.allow('npc1');
  const result = limiter.allow('npc1');
  assert(result.allowed === false);
  assert(typeof result.retryAfter === 'number');
});

test('tracks keys independently', () => {
  const limiter = new RateLimiter({ maxRequests: 1, windowMs: 60000 });
  limiter.allow('npc1');
  assert(limiter.allow('npc2').allowed === true);
  assert(limiter.allow('npc1').allowed === false);
});

test('resets specific key', () => {
  const limiter = new RateLimiter({ maxRequests: 1, windowMs: 60000 });
  limiter.allow('npc1');
  limiter.reset('npc1');
  assert(limiter.allow('npc1').allowed === true);
});

test('reports remaining count', () => {
  const limiter = new RateLimiter({ maxRequests: 3, windowMs: 60000 });
  const r1 = limiter.allow('npc1');
  assert(r1.remaining === 2);
  const r2 = limiter.allow('npc1');
  assert(r2.remaining === 1);
});

console.log('\nAll tests passed!');
