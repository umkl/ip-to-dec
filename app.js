const https = require("https");

function fetchPublicIP(callback) {
	https
		.get("https://ifconfig.co/ip", (resp) => {
			let data = "";
			resp.on("data", (chunk) => {
				data += chunk;
			});
			resp.on("end", () => {
				callback(null, data.trim());
			});
		})
		.on("error", (err) => {
			callback(err, null);
		});
}

function ipToDecimal(ip) {
	if (!ip) {
		return new Promise((resolve, reject) => {
			fetchPublicIP((err, fetchedIP) => {
				if (err) {
					reject("Error fetching public IP: " + err.message);
				} else {
					const decimalIP = convertIpToDecimal(fetchedIP);
					resolve(decimalIP);
				}
			});
		});
	} else {
		return convertIpToDecimal(ip);
	}
}

function convertIpToDecimal(ip) {
	const octets = ip.split(".");

	if (octets.length !== 4) {
		throw new Error("Invalid IP address format");
	}

	return octets.reduce((acc, octet, index) => {
		const num = parseInt(octet, 10);

		if (isNaN(num) || num < 0 || num > 255) {
			throw new Error("Invalid octet value: " + octet);
		}

		return acc + (num << (8 * (3 - index)));
	}, 0);
}

module.exports = {
	ipToDecimal,
};
