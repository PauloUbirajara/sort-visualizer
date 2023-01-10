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
	// Aguardar tempo antes de criar novo canvas
	clearTimeout(debounceInterval);
	debounceInterval = setTimeout(() => {
		deletePreviousCanvas();
		console.log('recriando canvas');
		appendCanvasToHTML();
	}, DEBOUNCE_TIME_MS);
};

let stepActions = [];
let stepInterval = null;

const colors = {
	true: '#0f0',
	false: '#f00'
};

window.onmessage = (e) => {
	// Mensagens enviadas durante a ordenação
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
			drawValue({
				value: currentArray[first],
				index: first,
				color: colors[isCorrect],
				shouldPlaySound: true
			});
			drawValue({
				value: currentArray[second],
				index: second,
				color: colors[isCorrect],
				shouldPlaySound: true
			});
		});
		return;
	}

	if (name === 'sort-complete') {
		const { speed } = executeData;
		stepActions.forEach((stepFn, i) => {
			setTimeout(() => {
				stepFn();

				// Caso estiver no último valor
				if (i === stepActions.length - 1) {
					enableExecuteButton(true);
					draw(values);
				}
			}, speed * i);
		});
	}
};
