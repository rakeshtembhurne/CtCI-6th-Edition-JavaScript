const results = {};

function test(repeats, description, func, testCases = []) {
	for (let testCase of testCases) {
		if (func.apply(this, testCase.input) !== testCase.output) {
			console.info(
				"\x1b[31m%s\x1b[0m",
				`${description}: Test cases failing!`
			);
			return;
		}
	}

	const t1 = Date.now();
	for (let i = 0; i < repeats; ++i) {
		for (let testCase of testCases) {
			func.apply(this, testCase.input);
		}
	}
	const t2 = Date.now();
	const dt = t2 - t1;
	console.log(`${description}: total time is ${dt} ms`);
	results[description] = dt;
	return results;
}

function curry(func) {
	return function curried(...args) {
		if (args.length >= func.length) {
			return func.apply(this, args);
		} else {
			return function (...args2) {
				return curried.apply(this, args.concat(args2));
			};
		}
	};
}

const curriedTest = curry(test);
const repeatedTest = curriedTest(1_00_000);

module.exports = {
	test,
	curry,
	curriedTest,
	repeatedTest,
};
