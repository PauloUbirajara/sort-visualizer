const getControlsDiv = () => document.querySelector('.controls');

const getQuantityOutputLabel = () => document.querySelector('#quantity-value');
const getQuantityInput = () => document.querySelector('#quantity');

const getSpeedOutputLabel = () => document.querySelector('#speed-value');
const getSpeedInput = () => document.querySelector('#speed');

const getAlgorithmSelect = () => document.querySelector('#algorithm');

const getControlsForm = () => document.querySelector('form');

const getExecuteButton = () => document.querySelector('#execute-button');

function collapseControls() {
	const collapseClass = 'collapsed';
	const controlsDiv = getControlsDiv();
	controlsDiv.classList.contains(collapseClass)
		? controlsDiv.classList.remove(collapseClass)
		: controlsDiv.classList.add(collapseClass);
}

function updateQuantityValue() {
	getQuantityOutputLabel().textContent = getQuantityInput().value;
}

function updateSpeedValue() {
	getSpeedOutputLabel().textContent = getSpeedInput().value;
}

function fillAlgorithmList() {
	algorithms.forEach((alg) => {
		const option = document.createElement('option');
		option.value = alg.getID();
		option.innerText = alg.getName();
		getAlgorithmSelect().appendChild(option);
	});
}

function setupControlsListeners() {
	getQuantityInput().addEventListener('input', () => updateQuantityValue());
	getSpeedInput().addEventListener('input', () => updateSpeedValue());
	getControlsForm().addEventListener('submit', updateExecuteData);
}

let executeData = null;

function updateExecuteData(e) {
	e.preventDefault();

	executeData = Object.fromEntries(new FormData(e.target).entries());

	postMessage(new Step('start'));
	enableExecuteButton(false);
}

function enableExecuteButton(isEnabled) {
	if (!isEnabled) getExecuteButton().setAttribute('disabled', 'disabled');
	else getExecuteButton().removeAttribute('disabled');
}
