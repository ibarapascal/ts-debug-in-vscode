import DataObject from '../data_flow/data-object';

export default class CommonService {

    /**
     * Get object by attribute value min
     * @param data object array
     * @param attr sort index
     */
    static getAttrMin(data: DataObject[], attr: string) : DataObject{
        return data.reduce((prev, curr) => {
            return prev[attr] < curr[attr] ? prev : curr; 
        });
    }
    /**
     * Get object by attribute value max
     * @param data object array
     * @param attr sort index
     */
    static getAttrMax(data: DataObject[], attr: string) : DataObject{
        return data.reduce((prev, curr) => {
            return prev[attr] > curr[attr] ? prev : curr; 
        });
    }
    /**
     * Sort object array by attriute index or first attribute
     * @param data object array
     * @param index sort index
     */
    static makeIdxSort(data: DataObject[], index?: string) : DataObject[]{
        const key = index ? index : Object.keys(data[0])[0];
        return data.sort((a,b) => a[key] - b[key]);
    }
    /**
     * Get boolean return of checking whether the data in object is empty
     * @param itemValue value check
     */
    static checkIfNumberEmpty(itemValue: number) : boolean {
        return itemValue === 0 || itemValue === null || itemValue === undefined;
    }

}