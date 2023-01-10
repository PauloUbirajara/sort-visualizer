class SoundPlayer {
	context = new AudioContext();
	constructor() {
		this.oscillator = this.context.createOscillator();
		this.gainNode = this.context.createGain();
	}

	setType(type) {
		if (!this.oscillator) throw new Error('no oscillator');
		console.log('type', type);
		this.oscillator.type = type;
		return this;
	}

	setVolume(volume) {
		if (!this.gainNode) throw new Error('no gain node');
		console.log('volume', volume);
		this.gainNode.gain.setValueAtTime(volume, this.context.currentTime);
		return this;
	}

	setFrequency(frequency) {
		if (!this.oscillator) throw new Error('no oscillator');
		console.log('frequency', frequency);
		this.oscillator.frequency.setValueAtTime(
			frequency,
			this.context.currentTime
		);
		return this;
	}

	playSound({ value }) {
		if (!this.gainNode) throw new Error('no gain node');
		if (!this.oscillator) throw new Error('no oscillator');

		this.oscillator.connect(this.gainNode);

		this.setFrequency(value * 1000);

		this.gainNode.connect(this.context.destination);

		this.oscillator.start(0);
		return this;
	}

	stopSound() {
		if (!this.gainNode) throw new Error('no gain node');
		if (!this.oscillator) throw new Error('no oscillator');

		this.gainNode.gain.setTargetAtTime(
			1 / 1000,
			this.context.currentTime,
			0.02
		);
		this.oscillator.stop(this.context.currentTime + 0.05);
		return this;
	}
}
