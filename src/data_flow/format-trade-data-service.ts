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

    makeIdxSort(data: DataObject[], index?: string) : DataObject[]{
        const key = index ? index : Object.keys(data[0])[0];
        return data.sort((a,b) => a[key] - b[key]);
    }

    checkIfNumberEmpty(itemValue: number) : boolean {
        return itemValue === 0 || itemValue === null || itemValue === undefined;
    }

    makeOneEmptyAllEmpty(data: DataObject[], index?: string) : DataObject[]{
        for (let item of data) {
            Object.keys(item).every(key => {
                if (!this.checkIfNumberEmpty(item[key])) {
                    return true;
                } else {
                    Object.keys(item).forEach(k => {
                        if (!index || index !== k) {
                            item[k] = 0;
                        }
                    })
                    return false;
                }
            });
        }
        return data;
    }

    makeItemUnique(data: DataObject[], index?: string) : DataObject[]{
        if (index) {
            const list = this.makeIdxSort(data.slice(0), index);
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
    };

    makeEmptyItemDelete(data: DataObject[]) : DataObject[]{
        return data.filter(item => !Object.keys(item).some(key => this.checkIfNumberEmpty(item[key])));
    }

    makeIdxContinuous(data: DataObject[], index: string, step: number = 1) : DataObject[]{
        const itemMax = this.getAttrMax(data ,index);
        const itemMin = this.getAttrMin(data ,index);
        const shouldLength = (itemMax[index] - itemMin[index]) / step + 1;
        this.makeIdxSort(data, index);
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
    };

}

