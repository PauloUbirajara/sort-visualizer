class Algorithm {
	getName() {}
	getID() {}
	sort(array) {}
}

class Step {
	data = { name: null, data: null };

	constructor(name, data = null) {
		this.data = { name, data };
	}
}

class BubbleSort extends Algorithm {
	getName() {
		return 'Bubble Sort'
	}

	getID() {
		return '1';
	}

	sort(array) {
		let sorted = false;

		while (!sorted) {
			sorted = true;

			for (let i = 0; i < array.length - 1; i++) {
				// Comparar
				const comparison = {
					first: i,
					second: i + 1,
					isCorrect: true,
					currentArray: null
				};

				// Verificar
				if (array[i] > array[i + 1]) {
					const aux = array[i];
					array[i] = array[i + 1];
					array[i + 1] = aux;

					comparison['isCorrect'] = false;
					sorted = false;
				}

				comparison['currentArray'] = Array.from(array);

				postMessage(new Step('compare', comparison));
			}
		}

		postMessage(new Step('sort-complete'));
	}
}

class SelectionSort extends Algorithm {
	getName() {
		return 'Selection Sort'
	}

	getID() {
		return '2';
	}

	sort(array) {
		for (let i = 0; i < array.length - 1; i++) {
			let minimumValue = i;

			for (let j = i + 1; j < array.length; j++) {
				// Comparar
				const comparison = {
					first: i,
					second: j,
					isCorrect: true,
					currentArray: null
				};

				// Verificar
				if (array[j] < array[minimumValue]) {
					minimumValue = j;
					comparison['isCorrect'] = false;
				}

				comparison['currentArray'] = Array.from(array);

				postMessage(new Step('compare', comparison));
			}

			const aux = array[i];
			array[i] = array[minimumValue];
			array[minimumValue] = aux;
		}

		postMessage(new Step('sort-complete'));
	}
}
