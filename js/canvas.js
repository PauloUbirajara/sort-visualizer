const DEBOUNCE_TIME_MS = 500;
let debounceInterval = null;

const getCanvasDiv = () => document.querySelector('.canvas');
let currentCanvas = null;
let currentContext = null;

function setupCanvasDimensions(canvas) {
	const div = getCanvasDiv();
	canvas.width = div.offsetWidth;
	canvas.height = div.offsetHeight;
}

function clearCanvasBackground(canvas) {
	canvas.getContext('2d').fillStyle = '#000';
	canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
}

function appendCanvasToHTML() {
	const canvas = document.createElement('canvas');

	currentCanvas = canvas;
	currentContext = canvas.getContext('2d');

	setupCanvasDimensions(canvas);
	clearCanvasBackground(canvas);

	getCanvasDiv().appendChild(canvas);
}

function deletePreviousCanvas() {
	const div = getCanvasDiv();
	Array.from(div.children).forEach((c) => div.removeChild(c));
}
