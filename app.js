function ipToDecimal(ip) {
	if (ip == null) {
		return "Please provide an ip address";
	}
	const octets = ip.split(".").map(Number);
	return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
}

module.exports = {
	ipToDecimal,
};
