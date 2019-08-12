import DataObject from './data-object';
import fs from 'fs';

export default class IoTradeDataService {

    /**
     * 
     * @param path 
     */
    static getImportData(path: string): DataObject[] {
        return JSON.parse(fs.readFileSync(path, 'utf8')).data;
    }
    /**
     * 
     * @param path 
     * @param saveData 
     */
    static saveDataToJSON(path: string, saveData: DataObject[] | DataObject[][]) {
        const outputData = {data: saveData, }    
        fs.writeFileSync(path, JSON.stringify(outputData));
    }
    /**
     * 
     * @param path 
     * @param saveData 
     */
    static saveDataToCsv(path: string, saveData: DataObject[]) {
        const header = Object.keys(saveData[0]);
        let csv = saveData.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
        csv.unshift(header.join(','));
        const resultData = csv.join('\r\n');
        fs.writeFileSync(path, resultData);
    }
    /**
     * 
     * @param path 
     * @param saveData 
     */
    static saveDataToCsvChart(path: string, saveData: DataObject[]) {
        const header = Object.keys(saveData[0]);
        let csv = saveData.map(row => header.filter(item => item === 'close').map(fieldName => JSON.stringify(row[fieldName])).join(','));
        csv.unshift(header.filter(item => item === 'close').join(','));
        const resultData = csv.join('\r\n');
        fs.writeFileSync(path, resultData);
    }
}


