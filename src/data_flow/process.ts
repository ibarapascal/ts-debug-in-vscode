import FormatTradeDataService from '../data_flow/format-trade-data-service';
import DataObject from '../data_flow/data-object';

import data from '../_test_data_source/db-btc-hours-20130401-20190307.json';
// import data from '../_test_data_source/db-btc-hours-20140202-20190307.json';
let impData: DataObject[] = data.data; // Good to run
// let impData: DataObject[] = data.data.slice(-50000); => also same range of data
// start from middle => last the same
// Seems max length get from before: 54001 records.

const startTimestamp = FormatTradeDataService.getAttrMin(impData, 'time').time;
const endTimestamp = FormatTradeDataService.getAttrMax(impData, 'time').time;
const totalNumber = impData.length;
// console.log(impData[0]);
// [{"time":1357542000,"close":13.59,"high":13.59,"low":13.59,"open":13.59,"volumefrom":0,"volumeto":0},

const r1: DataObject[] = FormatTradeDataService.makeOneEmptyAllEmpty(impData);
const r2: DataObject[] = FormatTradeDataService.makeItemUnique(r1, 'time');
const outData: DataObject[] = FormatTradeDataService.makeEmptyItemDelete(r2);

const usableNumber = outData.length;
const nanNumber = totalNumber - usableNumber;
console.log(startTimestamp, endTimestamp, totalNumber, usableNumber, nanNumber);
// 1357542000 1551942000 54001 50670 3331
// 2013/1/7 16:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// console.log(outData[0], outData[1], outData[outData.length-1]);
// ...

const pieceData: DataObject[][] = FormatTradeDataService.makeIdxconsequentList(outData, 'time', 3600);
const maxLengthPieceData: DataObject[] = FormatTradeDataService.getMaxLengthList(pieceData);

const pieceLength = pieceData.length;
const startTimestampMax = FormatTradeDataService.getAttrMin(maxLengthPieceData, 'time').time;
const endTimestampMax = FormatTradeDataService.getAttrMax(maxLengthPieceData, 'time').time;
const maxLengthPieceNumber = maxLengthPieceData.length;
const maxLengthPiecePercent = maxLengthPieceNumber / totalNumber * 100;
console.log(startTimestampMax, endTimestampMax, maxLengthPieceNumber, maxLengthPiecePercent, pieceLength);
// 1391338800 1551942000 44613 82.61513675672673
// 2014/2/2 21:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// console.log(maxLengthPieceData[0], maxLengthPieceData[1], maxLengthPieceData[maxLengthPieceData.length-1]);
// ...

import fs from 'fs';
const outputPath = "src/_test_data_source/test-output.json"
const outputData = {
    data: maxLengthPieceData,
}
// fs.writeFileSync(outputPath, JSON.stringify(outputData));


/**
 * TODO
 * For list pass all using certain range length and step
 * NaN piece num
 * NaN piece max length
 * NaN pieve average length
 */
