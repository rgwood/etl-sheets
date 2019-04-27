import { RowData } from './rowData';
import { ColumnTransformer } from './columnTransformer';
import { RowTransformer } from './rowTransformer';

// A transformer which operates on an entire row. Can include multiple column transformers
export class TableTransformer {
    constructor(public expression: string, public columnFormulae: ColumnTransformer[] = []) {
    }

    public transform(table: RowData[]): RowData[] {
        let rowTransformer = new RowTransformer(this.expression, this.columnFormulae)
        let results: RowData[] = [];
        table.forEach(row => {
            let result = rowTransformer.transform(row);

            if (result) {
                if(result instanceof Array) {
                    (result as RowData[]).forEach(rd => results.push(rd));
                } else { //just a single row
                    results.push(result as RowData);
                }
            }
        });
        return results;
    }
}