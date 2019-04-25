import {Formula} from '../models/formula';
import {RowData} from '../models/rowdata';

export function transform(data: RowData[], formula: Formula): RowData[] {
    let cloned = clone(data);

    cloned.forEach(row => {
        try {
            row[formula.field] = formula.expressionToFunction()(row);   
        } catch (error) {
            console.error({error});
            row[formula.field] = NaN;
        }
    });

    return cloned;
}

function clone(data: RowData[]): RowData[] {
        // very hacky way to do a deep clone
        let cloned: RowData[] = JSON.parse(JSON.stringify(data));
        return cloned;
}

export function transformMultipleAndShowWork(initialData: RowData[], formulae: Formula[]): {formula: Formula, transformedData: RowData[]}[] {
    let results: {formula: Formula, transformedData: RowData[]}[] = [];
    let currentData = clone(initialData);
    formulae.forEach(f => {
        let transformed = transform(currentData, f);
        results.push({formula: f, transformedData: transformed});
        currentData = transformed;
    });
    return results;
}