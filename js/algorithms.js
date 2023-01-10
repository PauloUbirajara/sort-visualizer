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

function compare({ first, second, isCorrect, currentArray }) {
	const comparison = { first, second, isCorrect, currentArray };
	postMessage(new Step('compare', comparison));
}

class BubbleSort extends Algorithm {
	getName() {
		return 'Bubble Sort';
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
				let isCorrect = true;

				// Verificar
				if (array[i] > array[i + 1]) {
					const aux = array[i];
					array[i] = array[i + 1];
					array[i + 1] = aux;

					isCorrect = false;
					sorted = false;
				}

				compare({
					first: i,
					second: i + 1,
					isCorrect,
					currentArray: Array.from(array)
				});
			}
		}

		postMessage(new Step('sort-complete'));
	}
}

class SelectionSort extends Algorithm {
	getName() {
		return 'Selection Sort';
	}

	getID() {
		return '2';
	}

	sort(array) {
		for (let i = 0; i < array.length - 1; i++) {
			let minimumValue = i;

			for (let j = i + 1; j < array.length; j++) {
				// Comparar
				let isCorrect = true;

				// Verificar
				if (array[j] < array[minimumValue]) {
					minimumValue = j;
					isCorrect = false;
				}
				compare({
					first: i,
					second: j,
					isCorrect,
					currentArray: Array.from(array)
				});
			}

			const aux = array[i];
			array[i] = array[minimumValue];
			array[minimumValue] = aux;
		}

		postMessage(new Step('sort-complete'));
	}
}

class MergeSort extends Algorithm {
	getName() {
		return 'Merge Sort';
	}

	getID() {
		return '3';
	}

	mergeSort(array) {
		if (array.length === 1) return;

		const middle = parseInt(array.length / 2);
		const left = [];
		for (let i = 0; i < middle; i++) {
			left.push(array[i]);
		}
		const right = [];
		for (let i = middle; i < array.length; i++) {
			right.push(array[i]);
		}

		this.mergeSort(left);
		this.mergeSort(right);

		let leftIndex = 0;
		let rightIndex = 0;
		let currentIndex = 0;

		while (leftIndex < left.length && rightIndex < right.length) {
			if (left[leftIndex] < right[rightIndex]) {
				array[currentIndex] = left[leftIndex];
				compare({
					first: leftIndex,
					second: currentIndex,
					isCorrect: false,
					currentArray: array
				});
				leftIndex++;
			} else {
				array[currentIndex] = right[rightIndex];
				compare({
					first: rightIndex,
					second: currentIndex,
					isCorrect: false,
					currentArray: array
				});
				rightIndex++;
			}
			currentIndex++;
		}

		while (leftIndex < left.length) {
			array[currentIndex] = left[leftIndex];
			compare({
				first: leftIndex,
				second: currentIndex,
				isCorrect: true,
				currentArray: array
			});
			currentIndex++;
			leftIndex++;
		}

		while (rightIndex < right.length) {
			array[currentIndex] = right[rightIndex];
			compare({
				first: rightIndex,
				second: currentIndex,
				isCorrect: true,
				currentArray: array
			});
			currentIndex++;
			rightIndex++;
		}
	}

	sort(array) {
		// Comparar
		this.mergeSort(array);
		postMessage(new Step('sort-complete'));
	}
}
