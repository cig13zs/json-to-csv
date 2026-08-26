;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.JSONToCSV = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function flatten(obj, prefix, res) {
    prefix = prefix || '';
    res = res || {};
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const propKey = prefix ? prefix + '.' + key : key;
      const val = obj[key];
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        flatten(val, propKey, res);
      } else if (Array.isArray(val)) {
        res[propKey] = JSON.stringify(val);
      } else {
        res[propKey] = val;
      }
    }
    return res;
  }

  function convert(jsonInput, options) {
    options = options || {};
    const delimiter = options.delimiter || ',';
    let data = jsonInput;

    if (typeof jsonInput === 'string') {
      data = JSON.parse(jsonInput);
    }
    if (!Array.isArray(data)) {
      data = [data];
    }
    if (!data.length) return '';

    const flatRows = data.map(item => (typeof item === 'object' && item !== null ? flatten(item) : { value: item }));
    const headerSet = new Set();
    for (const row of flatRows) {
      for (const k in row) headerSet.add(k);
    }
    const headers = Array.from(headerSet);

    const escapeCell = function (val) {
      if (val == null) return '';
      const str = String(val);
      const safeStr = /^[=+\-@\t\r]/.test(str) ? "'" + str : str;
      if (safeStr.includes(delimiter) || safeStr.includes('"') || safeStr.includes('\n') || safeStr.includes('\r')) {
        return '"' + safeStr.replace(/"/g, '""') + '"';
      }
      return safeStr;
    };

    const csvLines = [headers.map(escapeCell).join(delimiter)];
    for (const row of flatRows) {
      csvLines.push(headers.map(h => escapeCell(row[h])).join(delimiter));
    }

    return csvLines.join('\n');
  }

  return { convert: convert, flatten: flatten };
});
