const algorithms = [new BubbleSort(), new SelectionSort()];

let values = [];

function setupRandomValues() {
	if (!currentCanvas) return;
	if (!currentContext) return;
	if (!executeData) return;

	values = [];

	const { algorithm: algorithmID } = executeData;

	if (!algorithms.filter((a) => a.getID() === algorithmID)) return;

	// Gerar valores iniciais
	const { quantity } = executeData;

	for (let i = 0; i < quantity; i++) {
		values.push(i);
	}
}

function shuffle() {
	if (!values) return;

	values.sort((_a, _b) => 0.5 - Math.random());
}

function drawValue({ value, index, color = '#fff', shouldPlaySound = false }) {
	if (!currentContext) return;
	if (!executeData) return;

	currentContext.fillStyle = color;

	const { quantity } = executeData;
	const y = currentCanvas.height;
	const width = currentCanvas.width / quantity;
	const x = width * index;
	const height = (currentCanvas.height / quantity) * -(value + 1);

	currentContext.fillRect(x, y, width, height);

	if (shouldPlaySound) {
		const player = new SoundPlayer();
		player
			.setType('sine')
			.setVolume(10)
			.playSound({ value: value / quantity })
			.stopSound();
	}
}

function draw(array) {
	if (!currentCanvas) return;

	// Limpar canvas
	clearCanvasBackground(currentCanvas);

	if (!currentContext) return;

	// Desenhar posições atuais
	currentContext.fillStyle = '#fff';

	array.forEach((p, i) => {
		drawValue({ value: p, index: i });
	});
}

function startSorting() {
	if (!values) return;

	const { algorithm: algorithmID } = executeData;
	const algorithm = algorithms.filter((a) => a.getID() === algorithmID);
	if (!algorithm) return;

	algorithm[0].sort(values);
}
