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
	sort(_inputArray) {
		const inputArray = _inputArray;
		const length = inputArray.length;
		const outputArray = [];
		if (Array.isArray(inputArray)) {
			if (length <= 3) {
				let sortedArray = bubbleSort(inputArray);
				return sortedArray;
			}
			let slicedArray = this.sliceBy(inputArray, 3);
			const slicedArrayLength = slicedArray.length;
			slicedArray = bubbleSort(slicedArray);
			slicedArray = bubbleArraySort(slicedArray);
			outputArray = [].concat(slicedArray);
			slicedArray = sortElement(slicedArray);
			while (!this.isEqual(outputArray, slicedArray)) {
				outputArray = [].concat(slicedArray);
				slicedArray = bubbleArraySort(slicedArray);
				slicedArray = sortElement(slicedArray);
			}
			return outputArray;
		}
		function bubbleSort(_inputArray) {
			const array = _inputArray;
			const length = array.length;
			if (length < 3) {
				for (let i = 0; i < length; i++) {
					return compareNextElement(array, i);
				}
			} else {
				if (i == 0) {
					array = compareNextElement(array, i);
				} else if (i == length - 1) {
					return array;
				} else {
					array = comaparePreviousElement(array, i);
					array = compareNextElement(array, i);
				}
			}
			return array;
		}
		function comaparePreviousElement(_inputArray, index) {
			let swap;
			const inputArray = _inputArray;
			if (inputArray[index - 1] < inputArray[index]) {
				swap = inputArray[index - 1];
				inputArray[index - 1] = inputArray[index];
				inputArray[index] = swap;
			}
			return inputArray;
		}
		function compareNextElement(_inputArray, index) {
			let swap;
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
const td = new toDoArrayLib();
console.log(td.isEqual(3, [1, 2, 3]));
