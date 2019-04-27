import {RowData} from './rowData';
import { ColumnTransformer } from './columnTransformer';
import { RowTransformer } from './rowTransformer';

// A transformer which operates on an entire row. Can include multiple column transformers
export class TableTransformer {
    constructor(public rowTransformer: RowTransformer) {
    }

    public transform(table: RowData[]) : RowData[] {

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