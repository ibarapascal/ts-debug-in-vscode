import { expect } from 'chai';

import CommonService from '../../data_flow/common-service';
import FormatTradeDataService from '../../data_flow/format-trade-data-service';
import SelectTradeDataService from '../../data_flow/select-trade-date-service';
import IoTradeDataService from '../../data_flow/io-trade-data-service';

describe('FormatTradeDataFormatTradeDataService', () => {

    beforeEach(() => {});

    const t1 = [{
        id: 1,
        value: 33,
        number: 222,
    },{
        id: 2,
        value: 22,
        number: 333,
    },{
        id: 3,
        value: 11,
        number: 111,
    }]

    it('getAttrMin-1', () => {
        expect(CommonService.getAttrMin(t1, 'id')).to.equal(t1[0]);
    })
    it('getAttrMin-2', () => {
        expect(CommonService.getAttrMin(t1, 'value')).to.equal(t1[2]);
    })

    it('getAttrMax-1', () => {
        expect(CommonService.getAttrMax(t1, 'id')).to.equal(t1[2]);
    })
    it('getAttrMax-2', () => {
        expect(CommonService.getAttrMax(t1, 'value')).to.equal(t1[0]);
    })

    it('makeIdxSort-1', () => {
        expect(JSON.stringify(CommonService.makeIdxSort(t1.slice(0), 'value'))).to.equal(JSON.stringify(t1.slice(0).reverse()));
    })
    it('makeIdxSort-2', () => {
        expect(JSON.stringify(CommonService.makeIdxSort(t1.slice(0), 'id'))).to.equal(JSON.stringify(t1));
    })
    it('makeIdxSort-3', () => {
        expect(JSON.stringify(CommonService.makeIdxSort(t1.slice(0), 'number'))).to.equal(JSON.stringify([t1[2],t1[0],t1[1]]));
    })
    it('makeIdxSort-4', () => {
        expect(JSON.stringify(CommonService.makeIdxSort(t1.slice(0)))).to.equal(JSON.stringify(t1.slice(0)));
    })

    const t2 = [{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 2,
        value: 0,
        number: 222,
    },{
        id: 3,
        value: 333,
        number: 0,
    },{
        id: 4,
        value: null,
        number: undefined,
    }]
    const t2R1 = [{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 2,
        value: 0,
        number: 0,
    },{
        id: 3,
        value: 0,
        number: 0,
    },{
        id: 4,
        value: 0,
        number: 0,
    }]
    const t2R2 = [{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 0,
        value: 0,
        number: 0,
    },{
        id: 0,
        value: 0,
        number: 0,
    },{
        id: 0,
        value: 0,
        number: 0,
    }]
    it('makeOneEmptyAllEmpty-1', () => {
        expect(JSON.stringify(FormatTradeDataService.makeOneEmptyAllEmpty(t2.slice(0), 'id'))).to.equal(JSON.stringify(t2R1.slice(0)));
    })
    it('makeOneEmptyAllEmpty-2', () => {
        expect(JSON.stringify(FormatTradeDataService.makeOneEmptyAllEmpty(t2.slice(0)))).to.equal(JSON.stringify(t2R2.slice(0)));
    })

    const t3 = [{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 2,
        value: 222,
        number: 222,
    },{
        id: 2,
        value: 111,
        number: 111,
    }]
    it('makeItemUnique-1', () => {
        expect(JSON.stringify(FormatTradeDataService.makeItemUnique(t3.slice(0)))).to.equal(JSON.stringify([t3.slice(0)[0],t3.slice(0)[3],t3.slice(0)[4]]));
    })
    it('makeItemUnique-2', () => {
        expect(JSON.stringify(FormatTradeDataService.makeItemUnique(t3.slice(0), 'id'))).to.equal(JSON.stringify([t3.slice(0)[0], t3.slice(0)[3]]));
    })

    const t4 = [{
        id: 1,
        value: 111,
        number: 111,
    },{
        id: 0,
        value: 111,
        number: 111,
    },{
        id: 1,
        value: 0,
        number: 111,
    },{
        id: 2,
        value: 222,
        number: 0,
    },{
        id: null,
        value: undefined,
        number: 999,
    }]
    it('makeEmptyItemDelete-1', () => {
        expect(JSON.stringify(FormatTradeDataService.makeEmptyItemDelete(t4.slice(0)))).to.equal(JSON.stringify([t4.slice(0)[0]]));
    })

    const t5 = [{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 3,
        value: 33,
        number: 333,
    },{
        id: 5,
        value: 55,
        number: 555,
    }]
    const t5R = [{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 2,
        value: 0,
        number: 0,
    },{
        id: 3,
        value: 33,
        number: 333,
    },{
        id: 4,
        value: 0,
        number: 0,
    },{
        id: 5,
        value: 55,
        number: 555,
    }]
    it('makeIdxContinuous-1', () => {
        expect(JSON.stringify(FormatTradeDataService.makeIdxContinuous(t5.slice(0), 'id'))).to.equal(JSON.stringify(t5R.slice(0)));
    })
    it('makeIdxContinuous-2', () => {
        expect(JSON.stringify(FormatTradeDataService.makeIdxContinuous(t5.slice(0), 'id', 2))).to.equal(JSON.stringify(t5.slice(0)));
    })

    const t6 = [{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 3,
        value: 33,
        number: 333,
    },{
        id: 2,
        value: 22,
        number: 222,
    },{
        id: 4,
        value: 22,
        number: 222,
    },{
        id: 5,
        value: 22,
        number: 222,
    },{
        id: 6,
        value: 22,
        number: 222,
    }]
    const t6R1 = [{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 2,
        value: 22,
        number: 222,
    },{
        id: 3,
        value: 33,
        number: 333,
    }]
    const t6R2 = [{
        id: 5,
        value: 22,
        number: 222,
    },{
        id: 6,
        value: 22,
        number: 222,
    }]
    it('getObjBeforeIdx-1', () => {
        expect(JSON.stringify(SelectTradeDataService.getObjBeforeIdx(t6.slice(0), 'id', 4, 10))).to.equal(JSON.stringify(t6R1.slice(0)));
    })
    it('getObjBeforeIdx-2', () => {
        expect(JSON.stringify(SelectTradeDataService.getObjBeforeIdx(t6.slice(0), 'id', 4))).to.equal(JSON.stringify([t6R1.slice(0)[2]]));
    })
    it('getObjAfterIdx-1', () => {
        expect(JSON.stringify(SelectTradeDataService.getObjAfterIdx(t6.slice(0), 'id', 4, 10))).to.equal(JSON.stringify(t6R2.slice(0)));
    })
    it('getObjAfterIdx-2', () => {
        expect(JSON.stringify(SelectTradeDataService.getObjAfterIdx(t6.slice(0), 'id', 4))).to.equal(JSON.stringify([t6R2.slice(0)[0]]));
    })

    const t7 = [{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 3,
        value: 33,
        number: 333,
    },{
        id: 2,
        value: 22,
        number: 222,
    },{
        id: 5,
        value: 55,
        number: 555,
    },{
        id: 6,
        value: 66,
        number: 666,
    },{
        id: 8,
        value: 88,
        number: 888,
    }]
    const t7R = [[{
        id: 1,
        value: 11,
        number: 111,
    },{
        id: 2,
        value: 22,
        number: 222,
    },{
        id: 3,
        value: 33,
        number: 333,
    }],[{
        id: 5,
        value: 55,
        number: 555,
    },{
        id: 6,
        value: 66,
        number: 666,
    }],[{
        id: 8,
        value: 88,
        number: 888,
    }]]
    it('makeIdxconsequentList-1', () => {
        expect(JSON.stringify(FormatTradeDataService.makeIdxconsequentList(t7.slice(0), 'id'))).to.equal(JSON.stringify(t7R.slice(0)));
    })



})