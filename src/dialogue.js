class DialogueManager {
  constructor(config) {
    this.apiEndpoint = config.apiEndpoint;
    this.apiKey = config.apiKey;
    this.model = config.model;
    this.sessions = new Map();
  }

  async generate(npcId, context) {
    const messages = this._buildMessages(npcId, context);
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 200,
        temperature: 0.85,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    this._updateHistory(npcId, context.playerMessage, reply);
    return this._parseReply(reply);
  }

  _buildMessages(npcId, context) {
    const history = this.sessions.get(npcId) || [];
    return [
      { role: 'system', content: context.systemPrompt },
      ...history.slice(-10),
      { role: 'user', content: context.playerMessage },
    ];
  }

  _updateHistory(npcId, userMsg, assistantMsg) {
    if (!this.sessions.has(npcId)) this.sessions.set(npcId, []);
    const history = this.sessions.get(npcId);
    history.push({ role: 'user', content: userMsg });
    history.push({ role: 'assistant', content: assistantMsg });
    if (history.length > 20) history.splice(0, 2);
  }

  _parseReply(raw) {
    const emotionMatch = raw.match(/\[emotion:(\w+)\]/i);
    const actionMatch = raw.match(/\[action:([^\]]+)\]/i);
    const text = raw.replace(/\[(emotion|action):[^\]]*\]/gi, '').trim();
    return {
      text,
      emotion: emotionMatch?.[1] || 'neutral',
      action: actionMatch?.[1] || null,
    };
  }
}

module.exports = { DialogueManager };
