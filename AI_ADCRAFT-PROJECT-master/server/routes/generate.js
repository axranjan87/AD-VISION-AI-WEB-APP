import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const {
			product = '',
			audience = '',
			tone = 'persuasive',
			platform = 'generic',
			language = 'English',
			length = 'short'
		} = req.body || {};

		if (!product) {
			return res.status(400).json({ error: 'Missing product.' });
		}
		if (!process.env.OPENAI_API_KEY) {
			return res.status(400).json({ error: 'Server is not configured with an OpenAI API key.' });
		}

		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

		const systemPrompt = `You are an expert ad copywriter. Write high-converting, original ads. Ensure the language is ${language}. Keep it ${length}. Include a strong CTA. Provide 3 distinct variations. Output as plain text with clear labels.`;
		const userPrompt = [
			`Product: ${product}`,
			`Target audience: ${audience || 'General'}`,
			`Tone: ${tone}`,
			`Platform: ${platform}`
		].join('\n');

		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt }
			],
			temperature: 0.8,
			max_tokens: 450
		});

		const text = response.choices?.[0]?.message?.content?.trim() || 'No content generated.';
		res.json({ text });
	} catch (error) {
		console.error('Generation error:', error);
		res.status(500).json({ error: 'Failed to generate ad copy.' });
	}
});

export default router;
