#!/usr/bin/env node

const { ipToDecimal } = require("../app.js");

console.log(ipToDecimal(process.argv[2]));
