class RateLimiter {
  constructor({ maxRequests = 10, windowMs = 60000 } = {}) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  allow(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const timestamps = (this.requests.get(key) || []).filter(t => t > windowStart);

    if (timestamps.length >= this.maxRequests) {
      const oldest = timestamps[0];
      const retryAfter = Math.ceil((oldest + this.windowMs - now) / 1000);
      return { allowed: false, retryAfter, remaining: 0 };
    }

    timestamps.push(now);
    this.requests.set(key, timestamps);
    return { allowed: true, retryAfter: 0, remaining: this.maxRequests - timestamps.length };
  }

  reset(key) {
    if (key) {
      this.requests.delete(key);
    } else {
      this.requests.clear();
    }
  }
}

module.exports = { RateLimiter };
