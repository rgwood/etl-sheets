import {ColumnTransformer} from '../models/columnTransformer';
import {RowData} from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';

// TODO: this is insanely inefficient and it will catch up with me someday. Spend some time thinking about copies+efficiency

export function transformMultipleAndShowWork(initialData: RowData[], transformers: TableTransformer[]): {transformer: TableTransformer, output: RowData[]}[] {
    let results: {transformer: TableTransformer, output: RowData[]}[] = [];
    let currentData = initialData;
    transformers.forEach(t => {
        let transformed = t.transform(currentData);
        results.push({transformer: t, output: transformed});
        currentData = transformed;
    });
    return results;
}