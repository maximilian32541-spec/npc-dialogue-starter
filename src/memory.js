class MemoryStore {
  constructor(maxEntries = 100) {
    this.store = new Map();
    this.maxEntries = maxEntries;
  }

  add(npcId, entry) {
    if (!this.store.has(npcId)) this.store.set(npcId, []);
    const memories = this.store.get(npcId);
    memories.push({
      ...entry,
      timestamp: Date.now(),
      importance: entry.importance || 1,
    });
    if (memories.length > this.maxEntries) {
      memories.sort((a, b) => b.importance - a.importance);
      memories.splice(this.maxEntries);
    }
  }

  getRelevant(npcId, query, limit = 5) {
    const memories = this.store.get(npcId) || [];
    const scored = memories.map(m => ({
      ...m,
      relevance: this._scoreRelevance(m, query),
    }));
    scored.sort((a, b) => b.relevance - a.relevance);
    return scored.slice(0, limit);
  }

  _scoreRelevance(memory, query) {
    const words = query.toLowerCase().split(/\s+/);
    const content = (memory.content || '').toLowerCase();
    let score = memory.importance;
    for (const word of words) {
      if (content.includes(word)) score += 2;
    }
    return score;
  }

  clear(npcId) {
    this.store.delete(npcId);
  }
}

module.exports = { MemoryStore };
