import DataObject from '../data-object';
import fs from 'fs';

let inputPath = "src/_test_data_source/test-output.json"

let impData: DataObject[] = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

console.log(impData.length);


const items = impData;
const header = Object.keys(items[0]);
let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
csv.unshift(header.join(','));
const resultData = csv.join('\r\n')

console.log(csv[0]);
console.log(csv[1]);

const rootPath = 'src/_test_data_source/'; // './src/_test_data_source/' the same
const fileName = 'test-output.csv';
const outputPath = rootPath + fileName;
fs.writeFileSync(outputPath, resultData);


// https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable