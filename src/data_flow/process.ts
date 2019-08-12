import CommonService from '../data_flow/common-service';
import FormatTradeDataService from '../data_flow/format-trade-data-service';
import SelectTradeDataService from '../data_flow/select-trade-date-service';
import IoTradeDataService from './io-trade-data-service';

import DataObject from '../data_flow/data-object';


function readData(): DataObject[] {
    const impData: DataObject[] = IoTradeDataService.getImportData(inputPath);
    return impData;
}

function getFormatData(impData: DataObject[]): DataObject[] {
    const r1: DataObject[] = FormatTradeDataService.makeOneEmptyAllEmpty(impData);
    const r2: DataObject[] = FormatTradeDataService.makeItemUnique(r1, 'time');
    const formatData: DataObject[] = FormatTradeDataService.makeEmptyItemDelete(r2);
    return formatData;
}

function getUsefulData(formatData: DataObject[]): DataObject[] {
    const r1: DataObject[][] = FormatTradeDataService.makeIdxconsequentList(formatData, 'time', 3600);
    const usefulData: DataObject[] = FormatTradeDataService.getMaxLengthList(r1);
    return usefulData;
}

function getTranData(usefulData: DataObject[]): DataObject[][] {
    const tranList: number[] = SelectTradeDataService.getTimestampWhenPriceChange(usefulData, 0.05, 0.01, true);
    const tranData: DataObject[][] = SelectTradeDataService.getObjListBeforeIdx(usefulData, 'time', tranList, 100);
    return tranData;
}

function saveUsefulData() {
    IoTradeDataService.saveDataToJSON(outputPath, usefulData);
    IoTradeDataService.saveDataToCsv(exportPath, usefulData.slice(0, 10));
    IoTradeDataService.saveDataToCsvChart(chartPath, usefulData);
}

function saveTranData() {
    IoTradeDataService.saveDataToJSON(outputPath, usefulData);
    // IoTradeDataService.saveDataToJSONMultiple()
}


const rootPath = 'src/_test_data_source/'; // './src/_test_data_source/' the same
// const inputJsonName = 'db-btc-hours-20130401-20190307.json';
const inputJsonName = 'BTCUSD-histohour-20140202-20190805.json';
const outputJsonName = 'test-output.json';
const outputCsvName = 'test-output.csv';
const outputCsvChartName = 'test-output-chart.csv';
const inputPath = rootPath + inputJsonName;
const outputPath = rootPath + outputJsonName;
const exportPath = rootPath + outputCsvName;
const chartPath = rootPath + outputCsvChartName;
// const subRootTranPath = 'trans/';
// const outputTranPath = rootPath + subRootTranPath + outputJsonName;
// const exportTranPath = rootPath+ subRootTranPath + outputCsvName;
// const chartTranPath = rootPath+ subRootTranPath + outputCsvChartName;


const impData = readData();
// console.log(impData[0]);
// [{"time":1357542000,"close":13.59,"high":13.59,"low":13.59,"open":13.59,"volumefrom":0,"volumeto":0},

const formatData = getFormatData(impData);
const startTimestamp = CommonService.getAttrMin(impData, 'time').time;
const endTimestamp = CommonService.getAttrMax(impData, 'time').time;
const totalNumber = impData.length;
const usableNumber = formatData.length;
const nanNumber = totalNumber - usableNumber;
console.log(startTimestamp, endTimestamp, totalNumber, usableNumber, nanNumber);
// 1357542000 1551942000 54001 50670 3331
// 2013/1/7 16:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// 0 1556866800 48001 47995 6
// 5/3/2019, 4:00:00 PM Standard Time
// 
// console.log(outData[0], outData[1], outData[outData.length-1]);
// ...

const usefulData = getUsefulData(formatData);
const startTimestampMax = CommonService.getAttrMin(usefulData, 'time').time;
const endTimestampMax = CommonService.getAttrMax(usefulData, 'time').time;
const maxLengthPieceNumber = usefulData.length;
const maxLengthPiecePercent = maxLengthPieceNumber / totalNumber * 100;
console.log(startTimestampMax, endTimestampMax, maxLengthPiecePercent, maxLengthPieceNumber);
// 1391338800 1551942000 44613 82.61513675672673
// 2014/2/2 21:00:00 GMT+0900 ~ 2019/3/7 16:00:00 GMT+0900
// 1391338800 1556866800 95.79175433845128 45981
// console.log(maxLengthPieceData[0], maxLengthPieceData[1], maxLengthPieceData[maxLengthPieceData.length-1]);
// ...


// saveUsefulData();


const tranData = getTranData(usefulData);
const tranDataLength = tranData.length;
console.log(tranDataLength);






