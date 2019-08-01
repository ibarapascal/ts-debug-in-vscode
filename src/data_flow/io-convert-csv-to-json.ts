/** Settings
package.json
{
    "dependencies": {
      "convert-csv-to-json": "0.0.15"
*/

// import csvToJson from 'convert-csv-to-json';
// import csvToJson = require('convert-csv-to-json');

// declare function require(name:string):any;
let csvToJson = require('convert-csv-to-json');

let fileInputName = 'src/_test_data_source/convert-csv-to-json-test.csv'; 
let fileOutputName = 'src/_test_data_source/test-output.json';

let json = csvToJson.formatValueByType().getJsonFromCsv(fileInputName);

for (let item of json) {
    console.log(item);
    if (typeof item === 'object') { // https://stackoverflow.com/questions/22380930/how-to-get-property-value-in-js-object-when-key-is-unknown
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                console.log(item[key]);
            }
        }
    }
}

// Not work
// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);