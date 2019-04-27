import { RowData } from './rowData';
import { ColumnTransformer } from './columnTransformer';
import { RowTransformer } from './rowTransformer';

// A transformer which operates on an entire row. Can include multiple column transformers
export class TableTransformer {
    constructor(public rowTransformer: RowTransformer) {
    }

    public transform(table: RowData[]): RowData[] {
        let results: RowData[] = [];
        table.forEach(row => {
            let result = this.rowTransformer.transform(row);

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