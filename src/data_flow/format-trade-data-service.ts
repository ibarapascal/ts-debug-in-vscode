import DataObject from '../data_flow/data-object';
import CommonService from '../data_flow/common-service';

export default class FormatTradeDataService {

    /**
     * Edit all object attribute value to 0 if there are any value empty (except index if setted)
     * @param data object array
     * @param index process except index
     */
    static makeOneEmptyAllEmpty(data: DataObject[], index?: string) : DataObject[]{
        for (let item of data) {
            Object.keys(item).every(key => {
                if (!CommonService.checkIfNumberEmpty(item[key])) {
                    return true;
                } else {
                    Object.keys(item).forEach(k => {
                        if (!index || index !== k) {
                            item[k] = 0;
                        }})
                    return false;
                }
            });
        }
        return data;
    }
    /**
     * Remove object if there are totally the same (or same in index)
     * @param data object array
     * @param index unique by index or totally unique
     */
    static makeItemUnique(data: DataObject[], index?: string) : DataObject[]{
        if (index) {
            const list = CommonService.makeIdxSort(data.slice(0), index);
            return list.filter((item, pos, ary) => {
                return !pos || item[index] !== ary[pos - 1][index];
            })
        } else {
            let seen = new Set();
            return data.filter(item => {
                const k = JSON.stringify(item);
                return seen.has(k) ? false : seen.add(k);
            });
        }
    }
    /**
     * Remove object which attributes get empty
     * @param data object array
     */
    static makeEmptyItemDelete(data: DataObject[]) : DataObject[]{
        return data.filter(item => !Object.keys(item).some(key => CommonService.checkIfNumberEmpty(item[key])));
    }
    /**
     * Add object to the index gap to build a index continuous object array
     * @param data object array
     * @param index sort index
     * @param step continuous step value
     */
    static makeIdxContinuous(data: DataObject[], index: string, step: number = 1) : DataObject[]{
        const itemMax = CommonService.getAttrMax(data ,index);
        const itemMin = CommonService.getAttrMin(data ,index);
        const shouldLength = (itemMax[index] - itemMin[index]) / step + 1;
        CommonService.makeIdxSort(data, index);
        if (itemMax[index] - itemMin[index] === (data.length - 1) * step) {
            return data;
        } else {
            let visitList = Array.from(Array(shouldLength).keys());
            visitList.forEach((item, i) => {
                visitList[i] = item * step + itemMin[index];
            })
            visitList.forEach((item, i) => {
                if (!data.some(x => x[index] === item)) {
                    const itemAdd = JSON.parse(JSON.stringify(data[0]));
                    Object.keys(itemAdd).forEach(key => {
                        itemAdd[key] = 0;
                    });
                    itemAdd[index] = visitList[i];
                    data.splice(i, 0, itemAdd);
                }
            })
        }
        return data;
    }
    /**
     * Make an continuous objects array list
     * @param data object array
     * @param index sort index
     * @param step continious step value
     * @param lengthMin piece array minimum length
     */
    static makeIdxconsequentList(data: DataObject[], index: string, step: number = 1, lengthMin: number = 1) : DataObject[][]{
        let resultDataList: DataObject[][] = [];
        let resultDataListItem: DataObject[] = [];
        CommonService.makeIdxSort(data, index);
        data.forEach((item, i) => {
            if (!i || item[index] - data[i-1][index] === step) {
                resultDataListItem.push(item);
            }
            else {
                resultDataList.push(resultDataListItem);
                resultDataListItem = [];
                resultDataListItem.push(item);
            }
            if (i === data.length - 1) {
                resultDataList.push(resultDataListItem);
            }
        });
        return resultDataList.filter(list => list.length >= lengthMin);
    }
    /**
     * Get the longest objecr array from the continuous objects array list
     * @param data object array list
     */
    static getMaxLengthList(data: DataObject[][]) : DataObject[] {
        let lengthList: Array<number> = [];
        data.forEach(list => lengthList.push(list.length));
        return data[lengthList.indexOf(Math.max(...lengthList))];
    }

}

