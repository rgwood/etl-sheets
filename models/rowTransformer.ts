import {RowData} from './rowData';
import { ColumnTransformer } from './columnTransformer';

// A transformer which operates on an entire row. Can include multiple column transformers
export class RowTransformer {
    constructor(public expression: string, public columnFormulae: ColumnTransformer[] = []) {
    }

    public transform(rowData: RowData) : RowData | RowData[] | undefined {
        let ret = this.expressionToFunction()(rowData);

        if(ret) {
            if(ret instanceof Array) {
                ret.forEach(row =>  {
                    this.columnFormulae.forEach(cf => {
                        row = cf.transform(row)
                    });
                })
            } else { //just a single row
                this.columnFormulae.forEach(cf => {
                    ret = cf.transform(ret as RowData)
                });                
            }

        }

        return ret;
    }

    private convertExpressionToJsFunctionString() {
        return `${this.expression.replace(/\$/g, 'row.')}; return row;`
    }

    private expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString()) as (row: RowData) => RowData | RowData[] | undefined;
    }
}