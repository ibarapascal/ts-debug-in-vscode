export default interface DataObject {
    [index: string]: number;
}

export class FormatTradeDataService {

    getAttrMin(data: DataObject[], attr: string) : DataObject{
        return data.reduce((prev, curr) => {
            return prev[attr] < curr[attr] ? prev : curr; 
        });
    }

    getAttrMax(data: DataObject[], attr: string) : DataObject{
        return data.reduce((prev, curr) => {
            return prev[attr] > curr[attr] ? prev : curr; 
        });
    }

    makeIdxSort(data: DataObject[], index: string) : DataObject[]{
        return data.sort((a,b) => a[index] - b[index]);
    }

    checkIfNumberEmpty(itemValue: number) : boolean {
        return itemValue === 0 || itemValue === null || itemValue === undefined;
    }

    makeOneEmptyAllEmpty(data: DataObject[]) : DataObject[]{
        for (let item of data) {
            Object.keys(item).forEach(key => {
                if (this.checkIfNumberEmpty(item[key])) {
                    /**
                     * set all attr to zero except index
                     */
                }
            });
        }
        let resultList = data;
        return resultList;
    }

    makeIdxContinuous(data: DataObject[], index: string, step: number) : DataObject[]{
        /**
         * let index with certain step.
         */
        let resultList = data;
        return resultList;
    };

    makeItemUnique(data: DataObject[]) : DataObject[]{
        return Array.from(new Set(data));
    };

    makeEmptyItemDelete(data: DataObject[]) : DataObject[]{
        /**
         * Delete the item which have empty
         */
        let resultList = data;
        return resultList;
    }

}

