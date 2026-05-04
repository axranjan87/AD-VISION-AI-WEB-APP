import express from 'express';

const router = express.Router();

// Helper function to make API requests using native fetch
async function apiRequest(url, options = {}) {
	const { timeout, ...fetchOptions } = options;
	const timeoutMs = timeout || 120000;
	
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
	
	try {
		const response = await fetch(url, {
			...fetchOptions,
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: response.statusText }));
			const error = new Error(errorData.message || errorData.error || 'API request failed');
			error.status = response.status;
			error.response = { data: errorData, status: response.status };
			throw error;
		}
		
		return await response.json();
	} catch (err) {
		clearTimeout(timeoutId);
		if (err.name === 'AbortError') {
			throw new Error('Request timeout');
		}
		throw err;
	}
}

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

		// Using Veo 3.1 Free API - Get free API key from: https://veo3api.com/free-api
		// Alternative: Stability AI - Get free key from: https://platform.stability.ai/
		const apiKey = process.env.VEO_API_KEY || process.env.STABILITY_API_KEY;
		const apiProvider = process.env.VEO_API_KEY ? 'veo' : 'stability';

		// Demo mode - if no API key, return a demo response for testing
		if (!apiKey) {
			console.log('⚠️  No video API key found. Using demo mode.');
			console.log('📹 Would generate video with:');
			console.log('  Product:', product);
			console.log('  Audience:', audience || 'General');
			console.log('  Tone:', tone);
			console.log('  Platform:', platform);
			console.log('  Language:', language);
			console.log('  Length:', length);
			
			// Return a demo video URL after a short delay to simulate generation
			await new Promise(resolve => setTimeout(resolve, 2000));
			return res.json({ 
				videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				message: `Demo mode: Sample video shown. Your inputs (${product.substring(0, 30)}...) were received. Add VEO_API_KEY or STABILITY_API_KEY to .env for real generation based on your inputs.`,
				demo: true,
				usedInputs: { product, audience, tone, platform, language, length }
			});
		}

		// Create a detailed, compelling video prompt based on all user inputs
		const durationMap = {
			short: { seconds: 8, desc: 'brief and impactful, 5-8 seconds' },
			medium: { seconds: 15, desc: 'engaging and informative, 10-15 seconds' },
			long: { seconds: 30, desc: 'comprehensive and detailed, 20-30 seconds' }
		};
		const durationInfo = durationMap[length] || durationMap.short;
		
		// Build a comprehensive prompt using all inputs
		let videoPrompt = `Create a professional ${tone} video advertisement for: "${product}"`;
		
		if (audience && audience.trim()) {
			videoPrompt += `\nTarget Audience: ${audience}`;
		}
		
		videoPrompt += `\nPlatform: ${platform}`;
		videoPrompt += `\nLanguage: ${language}`;
		videoPrompt += `\nDuration: ${durationInfo.desc}`;
		
		// Add tone-specific instructions
		const toneInstructions = {
			persuasive: 'Use compelling visuals, emotional appeal, and strong persuasive elements. Show benefits clearly.',
			friendly: 'Use warm, approachable visuals. Create a welcoming and relatable atmosphere.',
			professional: 'Use clean, corporate-style visuals. Focus on credibility and trustworthiness.',
			witty: 'Use creative, humorous visuals. Make it memorable and entertaining.',
			luxury: 'Use high-end, premium visuals. Emphasize quality, exclusivity, and sophistication.'
		};
		videoPrompt += `\nTone Style: ${toneInstructions[tone] || toneInstructions.persuasive}`;
		
		// Platform-specific guidance
		const platformGuidance = {
			'Google Ads': 'Optimize for search intent, clear value proposition, quick attention grab',
			'Facebook': 'Social engagement focused, relatable content, shareable moments',
			'Instagram': 'Visually stunning, trendy, story-driven, mobile-optimized',
			'LinkedIn': 'Professional, B2B focused, thought leadership, business value',
			'Twitter/X': 'Quick, punchy, trending topics, concise messaging',
			'generic': 'Universal appeal, clear messaging, broad audience'
		};
		videoPrompt += `\nPlatform Optimization: ${platformGuidance[platform] || platformGuidance.generic}`;
		
		// Final instructions
		videoPrompt += `\n\nVisual Requirements:
- High quality, professional, cinematic style
- Clear product/service showcase
- Strong visual appeal and aesthetics
- Include compelling call-to-action
- Smooth transitions and professional editing
- ${language !== 'English' ? `All text and narration in ${language}` : 'English language throughout'}`;

		// Log the prompt for debugging (shows what inputs are being used)
		console.log('📹 Video Generation Request:');
		console.log('Product:', product);
		console.log('Audience:', audience || 'General');
		console.log('Tone:', tone);
		console.log('Platform:', platform);
		console.log('Language:', language);
		console.log('Length:', length, `(${durationInfo.seconds}s)`);
		console.log('Prompt Length:', videoPrompt.length, 'characters');

		if (apiProvider === 'veo') {
			// Veo 3.1 Free API implementation
			try {
				const response = await apiRequest(
					'https://api.veo3api.com/v1/videos',
					{
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							model: 'veo-3.1',
							prompt: videoPrompt,
							output_format: 'mp4',
							duration: durationInfo.seconds,
							quality: 'high'
						}),
						timeout: 180000 // 3 minutes timeout
					}
				);

				if (response && response.video_url) {
					return res.json({ 
						videoUrl: response.video_url,
						message: 'Video ad generated successfully!'
					});
				} else if (response && response.id) {
					// If API returns a job ID, poll for completion
					const jobId = response.id;
					let attempts = 0;
					const maxAttempts = 60; // 2 minutes max

					while (attempts < maxAttempts) {
						await new Promise(resolve => setTimeout(resolve, 2000));
						
						try {
							const statusResponse = await apiRequest(
								`https://api.veo3api.com/v1/videos/${jobId}`,
								{
									method: 'GET',
									headers: {
										'Authorization': `Bearer ${apiKey}`
									},
									timeout: 10000
								}
							);

							if (statusResponse.status === 'completed' && statusResponse.video_url) {
								return res.json({ 
									videoUrl: statusResponse.video_url,
									message: 'Video ad generated successfully!'
								});
							} else if (statusResponse.status === 'failed') {
								throw new Error('Video generation failed');
							}
						} catch (pollError) {
							if (pollError.status === 404) {
								attempts++;
								continue;
							}
							throw pollError;
						}
						attempts++;
					}

					return res.status(504).json({ 
						error: 'Video generation is taking longer than expected. Please try again later.'
					});
				}
			} catch (veoError) {
				console.error('Veo API error:', veoError.response?.data || veoError.message);
				// Fall through to try Stability AI if Veo fails
			}
		}

		// Stability AI implementation (fallback or primary)
		try {
			const response = await apiRequest(
				'https://api.stability.ai/v2beta/stable-video/generate',
				{
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify({
						text_prompts: [
							{
								text: videoPrompt,
								weight: 1.0
							}
						],
						cfg_scale: 7.0,
						width: 1024,
						height: 576,
						seed: Math.floor(Math.random() * 1000000),
						steps: 30
					}),
					timeout: 120000
				}
			);

			if (response && response.id) {
				const generationId = response.id;
				let videoUrl = null;
				let attempts = 0;
				const maxAttempts = 30;

				while (attempts < maxAttempts && !videoUrl) {
					await new Promise(resolve => setTimeout(resolve, 2000));
					
					try {
						const statusResponse = await apiRequest(
							`https://api.stability.ai/v2beta/stable-video/generate/${generationId}`,
							{
								method: 'GET',
								headers: {
									'Authorization': `Bearer ${apiKey}`,
									'Accept': 'application/json'
								},
								timeout: 10000
							}
						);

						if (statusResponse.status === 'complete' && statusResponse.video) {
							videoUrl = statusResponse.video;
							break;
						} else if (statusResponse.status === 'failed') {
							throw new Error('Video generation failed');
						}
					} catch (pollError) {
						if (pollError.status === 404) {
							attempts++;
							continue;
						}
						throw pollError;
					}
					attempts++;
				}

				if (videoUrl) {
					return res.json({ 
						videoUrl,
						message: 'Video ad generated successfully!'
					});
				} else {
					return res.status(504).json({ 
						error: 'Video generation is taking longer than expected. Please try again later.'
					});
				}
			}
		} catch (stabilityError) {
			console.error('Stability AI error:', stabilityError.response?.data || stabilityError.message);
			throw stabilityError;
		}

		// If we get here, something went wrong
		throw new Error('Unexpected API response format');
	} catch (error) {
		console.error('Video generation error:', error);
		
		// More detailed error logging
		if (error.response) {
			const errorMsg = error.response.data?.message || error.response.data?.error || 'API error occurred';
			const statusCode = error.response.status || 500;
			console.error(`API Error (${statusCode}):`, errorMsg);
			return res.status(statusCode).json({ 
				error: `Video generation failed: ${errorMsg}. Please check your API key and credits.` 
			});
		}
		
		// Network or other errors
		console.error('Error details:', {
			message: error.message,
			name: error.name,
			stack: error.stack
		});
		
		return res.status(500).json({ 
			error: error.message || 'Failed to generate video ad. Please check your API key and try again. If you don\'t have an API key, the demo mode will be used.' 
		});
	}
});

export default router;
