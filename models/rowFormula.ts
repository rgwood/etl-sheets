import {RowData} from './rowdata';

// A formula which operates on a single column.
export class RowFormula {
    constructor(public expression: string) {
    }

    //expression example: 

    private example(row: RowData) : RowData {

        let expression = `
        $foo = 'bar';
        $bar = 'foo';
        `

        let transformed = `
        
        `

        row['foo'] = 'bar';
        row['bar'] = 'foo';
        return row;
    }

    private convertExpressionToJsFunctionString() {
        return `${this.expression.replace(/\$/g, 'row.')}; return row;`
    }

    public expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => RowData;
    }
}