import DataObject from '../data-object';
import fs from 'fs';
// -----------------------------------------------------------------------------------
// CONCLUSION

// We can handle 2.628M
// Almost 5 year minute records of kline data using JSON file and export / import it directly in ts.

// -----------------------------------------------------------------------------------
// RESULT

// import from .json
// Result: Read: No: 0.18M, Size: 20MB, OK
// Result: Read: No: 0.2M, Size: 23MB, NG

// fs.readFileSync
// Result: Read: No: 3.85M, Size: 441MB, OK
// Result: Read: No: 3.9M, Size: 447MB, NG

// fs.writeFileSync
// Result: Write: No: 4.05M, Size: 464MB, OK (Notice that minute for 10 year: 5.256M records)
// Result: Write: No: 4.1M, Size: 0, NG

// fs.writeFileSync with item 0
// Result: Write: No: 40M, Size: 195MB, OK
// Result: Write: No: 42M, Size: 0, NG

// -----------------------------------------------------------------------------------
// Write JSON
// import data from '../_test_data_source/BTCUSD-histohour-20140202-20190805.json';
// let impData: DataObject[] = data.data; // Good to run
// console.log(impData.length);
// let outputPath = "src/_test_data_source/test-output.json"
// let a = JSON.parse(JSON.stringify(impData));
// let outputData = impData.concat(a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a)
//     .slice(-10);
//     // .slice(-4000000);
// console.log(outputData.length);
// fs.writeFileSync(outputPath, JSON.stringify(outputData));
// -----------------------------------------------------------------------------------
// Write JSON with 0
// let item = {
//     time: 0,
//     close: 0,
//     high: 0,
//     low: 0,
//     open: 0,
//     volumefrom: 0, 
//     volumeto: 0,
// }
// let outputPath = "src/_test_data_source/test-output.json"
// let inputData: Array<DataObject> = [].concat.apply([], Array(100000).map(()=>item));
// let a = JSON.parse(JSON.stringify(inputData));
// let b = JSON.parse(JSON.stringify([].concat(a, a, a, a, a, a, a, a, a, a)));
// let outputData = JSON.parse(JSON.stringify([].concat(b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b)))
//     .slice(-40000000);
// console.log(outputData.length);
// fs.writeFileSync(outputPath, JSON.stringify(outputData));
// -----------------------------------------------------------------------------------
// Read JSON import
// import data from '../_test_data_source/test-output.json';
// let impData: DataObject[] = data; // Good to run
// console.log(impData.length);
// -----------------------------------------------------------------------------------
// Read JSON readFileSync
// let outputPath = "src/_test_data_source/test-output.json"
// let impData: DataObject[] = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
// console.log(impData.length);
// console.log(impData[0]);
// -----------------------------------------------------------------------------------
// Ref
// https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-file-into-server-memory
// function writeFileSync(path: PathLike | number, data: any, options?: WriteFileOptions): void;
// function readFileSync(path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): string | Buffer;


