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

    private convertExpressionToJsFunctionString() {
        return `${this.expression.replace(/\$/g, 'row.')}; return row;`
    }

    private expressionToFunction() {
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => RowData | RowData[] | undefined;
    }

    private clone<T>(data: T): T {
        // very hacky way to do a deep clone
        let cloned: T = JSON.parse(JSON.stringify(data));
        return cloned;
    }
}