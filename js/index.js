window.onload = () => {
	// Configurar canvas responsivo
	appendCanvasToHTML();

	// Configurar controles
	updateQuantityValue();
	updateSpeedValue();
	fillAlgorithmList();

	setupControlsListeners();
	enableExecuteButton(true);
};

window.onresize = () => {
	clearTimeout(debounceInterval);
	debounceInterval = setTimeout(() => {
		deletePreviousCanvas();
		console.log('recriando canvas');
		appendCanvasToHTML();
	}, DEBOUNCE_TIME_MS);
};

let stepActions = [];
let stepInterval = null;

window.onmessage = (e) => {
	const { name, data } = e.data.data;

	if (name === 'start') {
		setupRandomValues();
		shuffle();
		draw(values);
		stepActions = [];
		startSorting();
		return;
	}

	if (name === 'compare') {
		const { first, second, isCorrect, currentArray } = data;

		stepActions.push(() => {
			clearCanvasBackground(currentCanvas);

			draw(currentArray);
			const colors = {
				true: '#0f0',
				false: '#f00'
			};
			drawValue(currentArray[first], first, colors[isCorrect], true);
			drawValue(currentArray[second], second, colors[isCorrect], true);
		});
		return;
	}

	if (name === 'sort-complete') {
		const { speed } = executeData;
		stepActions.forEach((fn, i) => {
			setTimeout(() => {
				fn();

				// Caso estiver no último
				if (i === stepActions.length - 1) {
					enableExecuteButton(true);
					draw(values);
					resetAudioContext()
				}
			}, speed * i);
		});
	}
};
