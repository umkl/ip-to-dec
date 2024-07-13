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
	const octets = ip.split(".").map(Number);
	return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
}

module.exports = {
	ipToDecimal,
};
