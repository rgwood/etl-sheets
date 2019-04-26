import {RowData} from './rowdata';

// A formula which operates on a single column.
export class ColumnFormula {
    constructor(public columnName: string, public expression: string) {
    }

    private convertExpressionToJsFunctionString() {
        return `return ${this.expression.replace(/\$/g, 'row.')}`
    }

    public expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => any;
    }
}