import axios from 'axios';

export const askAI = async ({ prompt, model, systemPrompt, enabled = true }) => {
  if (!enabled) {
    return 'المساعد الذكي متوقف حاليًا بواسطة إعدادات النظام.';
  }

  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('Missing OPENROUTER_API_KEY');
  }

  const finalModel = model || process.env.AI_MODEL || 'anthropic/claude-3.5-sonnet';
  const finalSystemPrompt =
    systemPrompt ||
    'أنت مساعد ذكي لشركة تشطيبات وديكور اسمها Mohamed Design House. رد دائمًا بالعربية، بلغة واضحة وبسيطة، وقدّم اقتراحات مفيدة للتشطيبات والديكور، واطلب من العميل بيانات التواصل عند الحاجة.';

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: finalModel,
      messages: [
        { role: 'system', content: finalSystemPrompt },
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 20000,
    }
  );

  const choice = response.data.choices?.[0];
  return choice?.message?.content || 'لم أستطع توليد رد حاليًا، حاول مرة أخرى.';
};
