import {RowData} from './rowData';
import * as esprima from 'esprima';

// A formula which operates on a single column.
export class ColumnTransformer {
    constructor(public columnName: string, public expression: string) {
    }

    public transform(row: RowData) : RowData {
        let cloned = this.clone(row);
        try {
            cloned[this.columnName] = this.expressionToFunction()(row);   
        } catch (error) {
            console.error({error});
            cloned[this.columnName] = NaN;
        }

        return cloned;
    }

    private convertExpressionToJsFunctionString() {
        return `function lookupInternalId(code) { if(code == 'MSFY Equity') return undefined; else return code.substring(0,4);};
        return ${this.expression.replace(/\$/g, 'row.')}`
    }

    //todo make this private
    public expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => any;
    }

    private clone(data: RowData): RowData {
            // very hacky way to do a deep clone
            let cloned: RowData = JSON.parse(JSON.stringify(data));
            return cloned;
    }
}