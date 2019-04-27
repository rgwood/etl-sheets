import {ColumnTransformer} from '../models/columnTransformer';
import {RowData} from '../models/rowData';

// TODO: this is insanely inefficient and it will catch up with me someday. Spend some time thinking about copies+efficiency

export function transform(data: RowData[], formula: ColumnTransformer): RowData[] {
    let cloned = clone(data);

    cloned.forEach(row => {
        try {
            row[formula.columnName] = formula.expressionToFunction()(row);   
        } catch (error) {
            console.error({error});
            row[formula.columnName] = NaN;
        }
    });

    return cloned;
}

function clone(data: RowData[]): RowData[] {
        // very hacky way to do a deep clone
        let cloned: RowData[] = JSON.parse(JSON.stringify(data));
        return cloned;
}

export function transformMultipleAndShowWork(initialData: RowData[], formulae: ColumnTransformer[]): {formula: ColumnTransformer, transformedData: RowData[]}[] {
    let results: {formula: ColumnTransformer, transformedData: RowData[]}[] = [];
    let currentData = initialData;
    formulae.forEach(f => {
        let transformed = transform(currentData, f);
        results.push({formula: f, transformedData: transformed});
        currentData = transformed;
    });
    return results;
}