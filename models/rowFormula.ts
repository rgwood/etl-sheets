import {RowData} from './rowdata';
import { ColumnFormula } from './columnFormula';

// A formula which operates on a single column.
export class RowFormula {
    constructor(public expression: string, public columnFormulae: ColumnFormula[] = []) {
    }

    public transform(rowData: RowData) : RowData {
        let ret = this.expressionToFunction()(rowData);
        this.columnFormulae.forEach(cf => {
            ret = cf.transform(ret)
        });
        return ret;
    }

    private convertExpressionToJsFunctionString() {
        return `${this.expression.replace(/\$/g, 'row.')}; return row;`
    }

    private expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => RowData;
    }
}