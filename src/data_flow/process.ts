import FormatTradeDataService from '../data_flow/format-trade-data-service';
import DataObject from '../data_flow/data-object';
import fs from 'fs';

function readData(path: string): DataObject[] {
    const impData: DataObject[] = JSON.parse(fs.readFileSync(path, 'utf8')).data;
    return impData;
}

function getFormatData(impData: DataObject[]): DataObject[] {
    const r1: DataObject[] = FormatTradeDataService.makeOneEmptyAllEmpty(impData);
    const r2: DataObject[] = FormatTradeDataService.makeItemUnique(r1, 'time');
    const outData: DataObject[] = FormatTradeDataService.makeEmptyItemDelete(r2);
    return outData;
}

function getUsefulData(outData: DataObject[]): DataObject[] {
    const pieceData: DataObject[][] = FormatTradeDataService.makeIdxconsequentList(outData, 'time', 3600);
    const usefulData: DataObject[] = FormatTradeDataService.getMaxLengthList(pieceData);
    return usefulData;
}

function saveDataToJSON(path: string, saveData: DataObject[]) {
    const outputData = {data: saveData, }    
    fs.writeFileSync(path, JSON.stringify(outputData));
}

function saveDataToCsv(path: string, saveData: DataObject[]) {
    const header = Object.keys(saveData[0]);
    let csv = saveData.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(header.join(','));
    const resultData = csv.join('\r\n');
    fs.writeFileSync(path, resultData);
}

function saveDataToCsvChart(path: string, saveData: DataObject[]) {
    const header = Object.keys(saveData[0]);
    let csv = saveData.map(row => header.filter(item => item === 'close').map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(header.filter(item => item === 'close').join(','));
    console.log(csv[0]);
    console.log(csv[1]);
    console.log(csv[2]);
    const resultData = csv.join('\r\n');
    fs.writeFileSync(path, resultData);
}

const rootPath = 'src/_test_data_source/'; // './src/_test_data_source/' the same
const inputJsonName = 'db-btc-hours-20130401-20190307.json';
const outputJsonName = 'test-output.json';
const outputCsvName = 'test-output.csv';
const outputCsvChartName = 'test-output-chart.csv';
const inputPath = rootPath + inputJsonName;
const outputPath = rootPath + outputJsonName;
const exportPath = rootPath + outputCsvName;
const chartPath = rootPath + outputCsvChartName;

const impData = readData(inputPath);
// console.log(impData[0]);
// [{"time":1357542000,"close":13.59,"high":13.59,"low":13.59,"open":13.59,"volumefrom":0,"volumeto":0},

const formatData = getFormatData(impData);
const startTimestamp = FormatTradeDataService.getAttrMin(impData, 'time').time;
const endTimestamp = FormatTradeDataService.getAttrMax(impData, 'time').time;
const totalNumber = impData.length;
const usableNumber = formatData.length;
const nanNumber = totalNumber - usableNumber;
console.log(startTimestamp, endTimestamp, totalNumber, usableNumber, nanNumber);
// 1357542000 1551942000 54001 50670 3331
// 2013/1/7 16:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// console.log(outData[0], outData[1], outData[outData.length-1]);
// ...

const usefulData = getUsefulData(formatData);
const startTimestampMax = FormatTradeDataService.getAttrMin(usefulData, 'time').time;
const endTimestampMax = FormatTradeDataService.getAttrMax(usefulData, 'time').time;
const maxLengthPieceNumber = usefulData.length;
const maxLengthPiecePercent = maxLengthPieceNumber / totalNumber * 100;
console.log(startTimestampMax, endTimestampMax, maxLengthPiecePercent, maxLengthPieceNumber);
// 1391338800 1551942000 44613 82.61513675672673
// 2014/2/2 21:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// console.log(maxLengthPieceData[0], maxLengthPieceData[1], maxLengthPieceData[maxLengthPieceData.length-1]);
// ...

saveDataToJSON(outputPath, usefulData);
saveDataToCsv(exportPath, usefulData.slice(0, 10));
saveDataToCsvChart(chartPath, usefulData);



/**
 * TODO:
 * Promise the import / export
 * Service add TF needed data process
 * Other statistic summary: NaN piece num, NaN piece max length, NaN pieve average length
 */
