import DataObject from '../data_flow/data-object';
import CommonService from './common-service';

export default class SelectTradeDataService {
    /**
     * Get the objects which index value is smaller than setted value within certain steps
     * @param data object array
     * @param attr sort index
     * @param value value of index
     * @param length output length
     * @param strict if true, return [] when the result length doesn't fit length setted
     */
    static getObjBeforeIdx(data: DataObject[], attr: string, value: number, length: number = 1, strict: boolean = false) : DataObject[]{
        const resultList = CommonService.makeIdxSort(data, attr).filter(item => item[attr] < value).slice( - length);
        return strict && resultList.length !== length ? null : resultList;
    }
    /**
     * Get the objects which index value is larger than setted value within certain steps
     * @param data object array
     * @param attr sort index
     * @param value value of index
     * @param length output length
     * @param strict if true, return [] when the result length doesn't fit length setted
     */
    static getObjAfterIdx(data: DataObject[], attr: string, value: number, length: number = 1, strict: boolean = false) : DataObject[]{
        const resultList = CommonService.makeIdxSort(data, attr).filter(item => item[attr] > value).slice(0, length);
        return strict && resultList.length !== length ? null : resultList;
    }
    /**
     * Get the list of objects which index value is smaller than setted value within certain steps
     * @param data object array
     * @param attr sort index
     * @param valueList value list of index
     * @param length output length for each item
     * @param strict if true, item return [] when the result length doesn't fit length setted
     */
    static getObjListBeforeIdx(data: DataObject[], attr: string, valueList: number[], length: number = 1, strict: boolean = false) : DataObject[][]{
        let resultObjList : Array<DataObject[]> = [];
        valueList.forEach(item => {
            const pushItem = this.getObjBeforeIdx(data, attr, item, length, strict);
            pushItem ? resultObjList.push(pushItem) : null;
        })
        return resultObjList;
    }
    /**
     * Get the list of objects which index value is larger than setted value within certain steps
     * @param data object array
     * @param attr sort index
     * @param valueList value list of index
     * @param length output length for each item
     * @param strict if true, item return [] when the result length doesn't fit length setted
     */
    static getObjListAfterIdx(data: DataObject[], attr: string, valueList: number[], length: number = 1, strict: boolean = false) : DataObject[][]{
        let resultObjList : Array<DataObject[]> = [];
        valueList.forEach(item => {
            const pushItem = this.getObjAfterIdx(data, attr, item, length, strict);
            pushItem ? resultObjList.push(pushItem) : null;
        })
        return resultObjList;
    }
    /**
     * Get the timestamp list which fit the giving price change condition, for ML process
     * @param data object array
     * @param deltaRate desirable price change rate, by the delta from max/min of open
     * @param lossRate affordable price change rate different from desirable direction
     * @param direction while true the long, false the short
     */
    static getTimestampWhenPriceChange(data: DataObject[], deltaRate: number, lossRate: number, direction: boolean) : number[] {
        let resultTimestampList : Array<number> = [];
        // Case long
        if (direction) {
            data.forEach(item => {
                const maxDelta = (item.high - item.open) / item.open;
                const maxLoss = (item.open - item.low) / item.open;
                if (maxDelta > deltaRate && maxLoss < lossRate) {
                    resultTimestampList.push(item.time);
                }
            })
        // Case short
        } else {
            data.forEach(item => {
                const maxDelta = (item.open - item.low) / item.open;
                const maxLoss = (item.high - item.open) / item.open;
                if (maxDelta > deltaRate && maxLoss < lossRate) {
                    resultTimestampList.push(item.time);
                }
            })
        }
        return resultTimestampList;
    }

}