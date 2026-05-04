const form = document.getElementById('ad-form');
const outputEl = document.getElementById('output');
const textResultsEl = document.getElementById('text-results');
const videoResultsEl = document.getElementById('video-results');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const textModeBtn = document.getElementById('text-mode-btn');
const videoModeBtn = document.getElementById('video-mode-btn');
const videoOutput = document.getElementById('video-output');
const videoStatus = document.getElementById('video-status');
const downloadVideoBtn = document.getElementById('download-video-btn');

let currentMode = 'text'; // 'text' or 'video'

// Mode switching
textModeBtn.addEventListener('click', () => {
	currentMode = 'text';
	textModeBtn.classList.add('active');
	videoModeBtn.classList.remove('active');
	textResultsEl.classList.add('hidden');
	videoResultsEl.classList.add('hidden');
});

videoModeBtn.addEventListener('click', () => {
	currentMode = 'video';
	videoModeBtn.classList.add('active');
	textModeBtn.classList.remove('active');
	textResultsEl.classList.add('hidden');
	videoResultsEl.classList.add('hidden');
});

// Text ad generation
async function generateAds(payload) {
	const res = await fetch('/api/generate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		let errorData;
		try {
			errorData = await res.json();
		} catch {
			const errorText = await res.text();
			errorData = { error: errorText };
		}
		throw new Error(errorData.error || 'Failed to generate');
	}
	return res.json();
}

// Video ad generation
async function generateVideoAds(payload) {
	const res = await fetch('/api/generateVideo', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		let errorData;
		try {
			errorData = await res.json();
		} catch {
			const errorText = await res.text();
			errorData = { error: errorText };
		}
		throw new Error(errorData.error || 'Failed to generate video');
	}
	return res.json();
}

// Form submission
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const payload = Object.fromEntries(formData.entries());

	generateBtn.disabled = true;
	generateBtn.textContent = 'Generating...';

	if (currentMode === 'text') {
		// Text ad generation
		outputEl.textContent = 'Generating text ads...';
		textResultsEl.classList.remove('hidden');
		videoResultsEl.classList.add('hidden');

		try {
			const { text } = await generateAds(payload);
			outputEl.textContent = text;
		} catch (err) {
			outputEl.textContent = `Error: ${err.message}`;
		} finally {
			generateBtn.disabled = false;
			generateBtn.textContent = 'Generate Ads';
		}
	} else {
		// Video ad generation
		console.log('🎬 Starting video generation with inputs:');
		console.log('Payload:', payload);
		
		if (!videoStatus) {
			console.error('videoStatus element not found!');
			alert('Video status element not found. Please refresh the page.');
			generateBtn.disabled = false;
			generateBtn.textContent = 'Generate Ads';
			return;
		}
		
		// Validate required input
		if (!payload.product || !payload.product.trim()) {
			videoStatus.textContent = 'Error: Please enter a product/service description.';
			videoStatus.style.color = '#ef4444';
			videoStatus.style.display = 'block';
			videoResultsEl.classList.remove('hidden');
			generateBtn.disabled = false;
			generateBtn.textContent = 'Generate Ads';
			return;
		}
		
		videoStatus.textContent = `Generating video ad for "${payload.product}"... This may take 1-2 minutes.`;
		videoStatus.style.display = 'block';
		videoStatus.style.color = 'var(--text-dim)';
		if (videoOutput) videoOutput.style.display = 'none';
		videoResultsEl.classList.remove('hidden');
		textResultsEl.classList.add('hidden');
		if (downloadVideoBtn) downloadVideoBtn.disabled = true;

		try {
			const { videoUrl, message, demo } = await generateVideoAds(payload);
			
			if (videoUrl) {
				videoOutput.src = videoUrl;
				videoOutput.style.display = 'block';
				const statusMsg = demo 
					? '⚠️ Demo Mode: ' + (message || 'This is a sample video. Add API key for real generation.')
					: (message || 'Video generated successfully!');
				videoStatus.textContent = statusMsg;
				videoStatus.style.color = demo ? '#fbbf24' : 'var(--primary)';
				downloadVideoBtn.disabled = false;
				currentVideoUrl = videoUrl;
			} else {
				throw new Error('No video URL received');
			}
		} catch (err) {
			console.error('Video generation error:', err);
			videoStatus.textContent = `Error: ${err.message}`;
			videoStatus.style.color = '#ef4444';
			videoStatus.style.display = 'block';
			videoOutput.style.display = 'none';
		} finally {
			generateBtn.disabled = false;
			generateBtn.textContent = 'Generate Ads';
		}
	}
});

// Copy text button
copyBtn.addEventListener('click', async () => {
	const text = outputEl.textContent;
	if (!text) return;
	try {
		await navigator.clipboard.writeText(text);
		copyBtn.textContent = 'Copied!';
		setTimeout(() => (copyBtn.textContent = 'Copy All'), 1200);
	} catch (err) {
		alert('Failed to copy text');
	}
});

// Download video button
let currentVideoUrl = null;
downloadVideoBtn.addEventListener('click', async () => {
	if (!currentVideoUrl) return;
	
	try {
		const response = await fetch(currentVideoUrl);
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'ad-video.mp4';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
		
		downloadVideoBtn.textContent = 'Downloaded!';
		setTimeout(() => (downloadVideoBtn.textContent = 'Download Video'), 1200);
	} catch (err) {
		alert('Failed to download video');
	}
});
