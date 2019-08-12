import DataObject from './data-object';
import fs from 'fs';
import CommonService from '../data_flow/common-service';

export default class IoTradeDataService {

    /**
     * Single JSON file data import while attr start with 'data'
     * @param path import path without extended name
     */
    static getFromJSON(path: string): DataObject[] {
        return JSON.parse(fs.readFileSync(path + '.json', 'utf8')).data;
    }
    /**
     * Single JSON file data export
     * @param path export path without extended name
     * @param saveData data export
     */
    static saveToJSON(path: string, saveData: DataObject[] | DataObject[][]) {
        const outputData = {data: saveData, }    
        fs.writeFileSync(path + '.json', JSON.stringify(outputData));
    }
    /**
     * Single CSV file data export with all attr setted
     * @param path export path without extended name 
     * @param saveData data export
     */
    static saveToCsv(path: string, saveData: DataObject[]) {
        if (CommonService.checkIfNumberEmpty(saveData.length)) return; // temp handling [] situation
        const header = Object.keys(saveData[0]);
        let csv = saveData.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
        csv.unshift(header.join(','));
        const resultData = csv.join('\r\n');
        fs.writeFileSync(path + '.csv', resultData);
    }
    /**
     * Single CSV file data export with only attr 'close' setted for some simple chart usage
     * @param path export path without extended name 
     * @param saveData data export
     */
    static saveToCsvChart(path: string, saveData: DataObject[]) {
        if (CommonService.checkIfNumberEmpty(saveData.length)) return; // temp handling [] situation
        const header = Object.keys(saveData[0]);
        let csv = saveData.map(row => header.filter(item => item === 'close').map(fieldName => JSON.stringify(row[fieldName])).join(','));
        csv.unshift(header.filter(item => item === 'close').join(','));
        const resultData = csv.join('\r\n');
        fs.writeFileSync(path + '.csv', resultData);
    }
    /**
     * Multiple JSON file data export
     * @param pathRoot export folder path // ! notice that the folder must exist before running this
     * @param saveData data export
     */
    static saveToJSONMultiple(pathRoot: string, saveData: DataObject[][]) {
        const fileName = 'tran-';
        // Length of decimal length of data
        const dataLength: number = saveData.length.toString().length;
        saveData.forEach((item, index) => {
            // Output integers with leading zeros
            let fileIndex: string = (index + 1).toString().padStart(dataLength, '0');
            this.saveToJSON(pathRoot + fileName + fileIndex, item);
        })
    }
    /**
     * Multiple CSV file data export
     * @param pathRoot export folder path // ! notice that the folder must exist before running this
     * @param saveData data export'
     */
    static saveToCSVMultiple(pathRoot: string, saveData: DataObject[][]) {
        const fileName = 'tran-';
        // Length of decimal length of data
        const dataLength: number = saveData.length.toString().length;
        saveData.forEach((item, index) => {
            // Output integers with leading zeros
            let fileIndex: string = (index + 1).toString().padStart(dataLength, '0');
            this.saveToCsv(pathRoot + fileName + fileIndex, item);
        })
    }
    /**
     * Delete all files in specific folder
     * @param path delete folder path
     */
    static deleteFolderFiles(path: string) {
        fs.readdir(path, (err, files) =>{
            files.forEach(file => {
                fs.unlink(path + file, err => {});
            });
        });
    }
}


