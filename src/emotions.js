const EMOTION_MODIFIERS = {
  happy: { temperature: 0.9, prefix: 'Speak with enthusiasm and warmth.' },
  sad: { temperature: 0.6, prefix: 'Speak slowly, with melancholy.' },
  angry: { temperature: 0.7, prefix: 'Speak sharply and with irritation.' },
  neutral: { temperature: 0.85, prefix: '' },
  surprised: { temperature: 0.95, prefix: 'Speak with astonishment.' },
};

function modifyPromptWithEmotion(basePrompt, emotion) {
  const mod = EMOTION_MODIFIERS[emotion] || EMOTION_MODIFIERS.neutral;
  return mod.prefix ? `${mod.prefix} ${basePrompt}` : basePrompt;
}

function getTemperatureForEmotion(emotion) {
  return (EMOTION_MODIFIERS[emotion] || EMOTION_MODIFIERS.neutral).temperature;
}

module.exports = { modifyPromptWithEmotion, getTemperatureForEmotion, EMOTION_MODIFIERS };
