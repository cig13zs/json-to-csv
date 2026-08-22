const sample = "[\n  {\n    \"id\": 101,\n    \"name\": \"Sarah Connor\",\n    \"contact\": {\n      \"email\": \"sarah@cyberdyne.org\",\n      \"phone\": \"+1-555-0199\"\n    },\n    \"roles\": [\"Security\", \"Operations\"],\n    \"active\": true\n  },\n  {\n    \"id\": 102,\n    \"name\": \"John Connor\",\n    \"contact\": {\n      \"email\": \"john@techcom.io\"\n    },\n    \"roles\": [\"Commander\"],\n    \"active\": true\n  }\n]";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const txt = inputEl.value;
  if (!txt.trim()) { outputEl.value = ''; if (statsEl) statsEl.textContent = 'Empty input'; return; }
  try {
    const csv = JSONToCSV.convert(txt);
    outputEl.value = csv;
    const lines = csv.split('\n');
    if (statsEl) statsEl.textContent = `Converted ${lines.length - 1} records to RFC 4180 CSV`;
  } catch (err) {
    outputEl.value = 'Invalid JSON: ' + err.message;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied CSV!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
