import { RowData } from './rowData';
import { ColumnTransformer } from './columnTransformer';

// A transformer which operates on an entire row. Can include multiple column transformers
export class RowTransformer {

    constructor(public expression: string, public columnFormulae: ColumnTransformer[] = []) {
    }

    public transform(rowData: RowData): RowData | RowData[] | undefined {
        let cloned = this.clone(rowData);

        let afterRowTransform: RowData | RowData[] | undefined  = undefined;
        
        //todo: proper error handling
        try {
            afterRowTransform = this.expressionToFunction()(cloned);
        } catch (error) {
            console.error({error});
        }

        if (!afterRowTransform) {
            return afterRowTransform;
        }

        if (afterRowTransform instanceof Array) {
            let ret: RowData[] = [];

            afterRowTransform.forEach(row => {
                this.columnFormulae.forEach(cf => {
                    row = cf.transform(row);
                });
                ret.push(row);
            });

            return ret;
        } else { //just a single row
            this.columnFormulae.forEach(cf => {
                afterRowTransform = cf.transform(afterRowTransform as RowData)
            });
        }

        return afterRowTransform;
    }

    // The worst part of this entire prototype. For production, need to think seriously about expression language+parsing
    private convertExpressionToJsFunctionString() {
        let expression = this.expression;

        //extremely hacky way to handle arbitrary filter expressions
        if(this.expression.startsWith('filterOut(')) {
            let filterExpression = this.expression.slice(10,this.expression.length - 1);
            expression = `if(${filterExpression}) return undefined; else return row;`
        }

        // This is the absolute craziest way of defining helper functions, but Function doesn't have access to local scope
        var helpers = `function duplicate(row) {return [row,row];};
        function lookupInternalId(code) {return code.substring(0,4);};`
        // filter($ticker == 'AAPL Equity') -> 
        // function filter(expression) {return undefined;};

        return `${helpers}${expression.replace(/\$/g, 'row.')}; 
        return row;`
    }

    private expressionToFunction() {
        return Function('row', this.convertExpressionToJsFunctionString())as (row: RowData) => RowData | RowData[] | undefined;
    }

    private clone<T>(data: T): T {
        // very hacky way to do a deep clone
        let cloned: T = JSON.parse(JSON.stringify(data));
        return cloned;
    }
}