class ArrayLib {
	sliceInto(inputArray, sliceInto) {
		let outputArray = [];
		const slicedArraySize = Math.ceil(inputArray.length / sliceInto);
		outputArray = slice(inputArray, slicedArraySize, sliceInto);
		return outputArray;

		function slice(arr, size, sliceInto) {
			let outputArray = [];
			let slicedArray = [];
			for (let j = 0; j < sliceInto; j++) {
				if (arr.length % sliceInto !== 0) {
					if (j === sliceInto - 1) {
						for (let i = 0; i < arr.length - size * j; i++) {
							slicedArray.push(arr[j * size + i]);
							console.log(arr[j * size + i]);
						}
						outputArray.push(slicedArray);
					} else {
						for (let i = 0; i < size; i++) {
							slicedArray.push(arr[j * size + i]);
						}
						outputArray.push(slicedArray);
						slicedArray = [];
					}
				} else {
					for (let i = 0; i < size; i++) {
						slicedArray.push(arr[j * size + i]);
					}
					outputArray.push(slicedArray);
					slicedArray = [];
				}
			}
			return outputArray;
		}
	}
	sliceBy(_inputArray, _size) {
		const inputArray = _inputArray;
		const size = _size;
		const length = inputArray.length;
		const outputArray = [];
		const counter = Math.ceil(length / size);
		let slicedArray = [];
		if (Array.isArray(inputArray)) {
			for (let j = 0; j < counter; j++) {
				if (j === counter - 1) {
					for (let i = 0; i < length - j * size; i++) {
						slicedArray.push(inputArray[j * size + i]);
					}
					outputArray.push(slicedArray);
				} else {
					for (let i = 0; i < size; i++) {
						slicedArray.push(inputArray[j * size + i]);
					}
					outputArray.push(slicedArray);
					slicedArray = [];
				}
			}
			return outputArray;
		}
		return new Error(`slice function expects an array as first Argument`);
	}
	isEqual(_firstArray, _secondArray) {
		if (Array.isArray(_secondArray) && Array.isArray(_firstArray)) {
			const firstArray = _firstArray;
			const secondArray = _secondArray;
			const len1 = firstArray.length;
			const len2 = secondArray.length;
			if (len1 !== len2) {
				return false;
			}
			for (let i = 0; i < len1; i++) {
				if (firstArray[i] !== secondArray[i]) {
					return false;
				}
			}
			return true;
		}
		return new Error("isEqual expects two arrays as arguments");
	}
	reduceTo(_inputArray, _value = _inputArray.length, _startFrom = 0) {
		const inputArray = _inputArray;
		const value = _value;
		const output = [];
		const length = inputArray.length;
		const startFrom = _startFrom;
		const netArrayLength = length - startFrom; /// needed for check for smaller arrays
		if (!isNaN(value) && !isNaN(startFrom)) {
			if (value === length && startFrom === 0) {
				return inputArray;
			} else if (value >= 0 && netArrayLength >= value) {
				for (let i = startFrom; i < value + startFrom; i++) {
					output.push(inputArray[i]);
				}
				return output;
			} else if (value >= 0 && netArrayLength <= value) {
				for (let i = startFrom; i < length; i++) {
					output.push(inputArray[i]);
				}
				return output;
			}
			return new Error(
				"reduceTo function expects a possitive number as second argument"
			);
		}
		return new Error(
			"reduceTo function expects a number as second argument and third Argument"
		);
	}
	insert(_inputArray, index, item) {
		_inputArray[index] = item;
		return _inputArray;
	}
	sort(_inputArray) {
		const inputArray = _inputArray;
		const length = inputArray.length;
		let slicedArray = [];
		let elBubbleSortedArray = [];
		let arBubbleSortedArray = [];
		let sortedArray;
		let arSortedArray;
		let outputArray = [];
		if (Array.isArray(inputArray)) {
			if (length <= 3) {
				sortedArray = bubbleSort(inputArray);
				return sortedArray;
			}
			slicedArray = this.sliceBy(inputArray, 3);
			const slicedArrayLength = slicedArray.length;
			for (let i = 0; i < slicedArrayLength; i++) {
				elBubbleSortedArray.push(bubbleSort(slicedArray[i]));
			}

			for (let i = 0; i < elBubbleSortedArray.length; i += 3) {
				let reducedArray = this.reduceTo(elBubbleSortedArray, 3, i);
				for (let j = 0; j < reducedArray.length; j++) {
					arSortedArray = bubbleArraySort(reducedArray, j);
				}
				arBubbleSortedArray.push(arSortedArray);
			}
			outputArray = [].concat(arBubbleSortedArray);
			while (!this.isEqual(outputArray, arBubbleSortedArray)) {
				let swap;
				let changedIndex = { a, b };
				let modified = [];
				for (let i = 0; i < arBubbleSortedArray.length; i++) {
					for (let j = 0; j < 3; j++) {
						for (let k = 0; k < arBubbleSortedArray.length; k += 3) {
							if (changedIndex.a === i && changedIndex.b === j) {
								continue;
							} else if (
								arBubbleSortedArray[i][j] > arBubbleSortedArray[k][i]
							) {
								swap = arBubbleSortedArray[i][j];
								arBubbleSortedArray[i][j] = arBubbleSortedArray[k][i];
								arBubbleSortedArray[k][i] = swap;
								changedIndex = { a: i, b: j };
								for (let i = 0; i < 3; i++) {
									this.insert(arBubbleSortedArray,(
										bubbleSort(arBubbleSortedArray[k][i])
									);
								}
								break;
							}
						}
					}
				}
			}
			for (let i = 0; i < elBubbleSortedArray.length; i += 3) {
				//let reducedArray = this.reduceTo(elBubbleSortedArray, 3, i);
				// for (let j = 0; j < reducedArray.length; j++) {
				sortedArray = bubbleArraySort(reducedArray, i);
				// }
				arBubbleSortedArray.push(sortedArray);
			}

			// console.log(arBubbleSortedArray);
			// for(let i=0;i<arBubbleSortedArray.length;i++){
			// 	for(let j=0;j<arBubbleSortedArray[i].length;j++){
			// 		if(){

			// 		}
			// 	}
			// }

			//outputArray = [].concat(slicedArray);
			//slicedArray = sortElement(slicedArray);
			// while (!this.isEqual(outputArray, slicedArray)) {
			// 	for (let i = 0; i < length; i++) {
			// 		outputArray = [].concat(slicedArray, i);
			// 		slicedArray = bubbleSort(slicedArray, i);
			// 		slicedArray = bubbleArraySort(slicedArray, i);
			// 		slicedArray = sortElement(slicedArray, i);
			// 	}
			// }
			// return outputArray;
		}
		// function sortElement(_inputArray, index) {
		// 	const array = _inputArray;
		// 	const length = array.length;
		// 	for (let j = 0; j < length; j++) {
		// 		if (array[index][index + 1] < array[index + 1][j]) {
		// 			swap();
		// 			return array;
		// 		}
		// 		break;
		// 	}
		// }
		function bubbleArraySort(_inputArray, _index) {
			const index = _index;
			let array = _inputArray;
			const length = array.length;
			if (length < 3) {
				if (length !== 1) {
					for (let i = 0; i < length; i++) {
						return compareNextArrayElement(array, i);
					}
				}
			} else {
				if (index == 0) {
					array = compareNextArrayElement(array, index);
				} else if (index == length - 1) {
					return array;
				} else {
					array = compareNextArrayElement(array, index);
					array = comaparePreviousArrayElement(array, index);
				}
			}
			return array;
		}
		function compareNextArrayElement(_inputArray, _index) {
			let swap;
			const index = _index;
			const inputArray = _inputArray;
			if (inputArray[index][0] < inputArray[index + 1][0]) {
				swap = inputArray[index];
				inputArray[index] = inputArray[index + 1];
				inputArray[index + 1] = swap;
			}
			return inputArray;
		}
		function comaparePreviousArrayElement(_inputArray, index) {
			let swap;
			const inputArray = _inputArray;
			if (inputArray[index - 1][0] < inputArray[index][0]) {
				swap = inputArray[index - 1];
				inputArray[index - 1] = inputArray[index];
				inputArray[index] = swap;
			}
			return inputArray;
		}
		function bubbleSort(_inputArray) {
			let array = _inputArray;
			const length = array.length;
			if (length < 3) {
				if (length !== 1) {
					for (let i = 0; i < length; i++) {
						return compareNextElement(array, i);
					}
				}
			} else {
				for (let i = 0; i < length; i++) {
					if (i == 0) {
						array = compareNextElement(array, i);
					} else if (i == length - 1) {
						return array;
					} else {
						array = compareNextElement(array, i);
						array = comaparePreviousElement(array, i);
					}
				}
			}
			return array;
		}
		function comaparePreviousElement(_inputArray, _index) {
			let swap;
			const index = _index;
			const inputArray = _inputArray;
			if (inputArray[index - 1] < inputArray[index]) {
				swap = inputArray[index - 1];
				inputArray[index - 1] = inputArray[index];
				inputArray[index] = swap;
			}
			return inputArray;
		}
		function compareNextElement(_inputArray, _index) {
			let swap;
			const index = _index;
			const inputArray = _inputArray;
			if (inputArray[index] < inputArray[index + 1]) {
				swap = inputArray[index];
				inputArray[index] = inputArray[index + 1];
				inputArray[index + 1] = swap;
			}
			return inputArray;
		}
	}
}
const td = new ArrayLib();
// //console.log());
// const m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// console.log();
// td.sort(m);
//console.log(td.sliceBy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
//console.log(td.sliceBy(, 3));
// console.log(td.reduceTo([1, 2, 3, 4, 5]));
console.log(td.insert([0, 0, 0, 0, 0, 0], 3, 5));
