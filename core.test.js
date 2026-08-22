const assert = require('assert');
const JSONToCSV = require('./core');

const input = [
  { id: 1, name: "Alice", address: { city: "New York", zip: "10001" }, tags: ["admin", "dev"] },
  { id: 2, name: "Bob, Jr.", address: { city: "San Francisco" }, active: true }
];

const csv = JSONToCSV.convert(input);
const lines = csv.split('\n');
assert.strictEqual(lines[0], 'id,name,address.city,address.zip,tags,active');
assert.strictEqual(lines[2].includes('"Bob, Jr."'), true);
console.log('ok, all JSONToCSV assertions passed');
