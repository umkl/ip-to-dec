#!/usr/bin/env node

const { ipToDecimal } = require("../app.js");

const ipAddress = process.argv[2];

const result = ipToDecimal(ipAddress);

if (result instanceof Promise) {
	result
		.then((decimalValue) => {
			console.log(
				`The decimal value of IP address ${
					ipAddress || "fetched"
				} is ${decimalValue}`
			);
		})
		.catch((error) => {
			console.error(error);
		});
} else {
	console.log(`The decimal value of IP address ${ipAddress} is ${result}`);
}
