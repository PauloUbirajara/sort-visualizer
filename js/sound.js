let audioContext = new AudioContext();

function playSound(value, duration) {
	setTimeout(() => {
		const o = audioContext.createOscillator();
		o.type = 'sine';

		const g = audioContext.createGain();
		g.gain.value = 0.1;

		// Som de acordo com o valor
		const minFrequency = 300.0;
		const maxFrequency = 440.0;

		o.frequency.value = value * (maxFrequency - minFrequency) + minFrequency;

		o.connect(g);
		g.connect(audioContext.destination);

		o.start(0);
		setTimeout(() => {
			g.gain.exponentialRampToValueAtTime(
				0.00000001,
				audioContext.currentTime + 0.01
			);
		}, duration);
	});
}

function resetAudioContext() {
	audioContext = new AudioContext();
}
