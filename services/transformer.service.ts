import {Formula} from '../models/formula';
import {RowData} from '../models/rowdata';

// TODO: this is insanely inefficient and it will catch up with me someday. Spend some time thinking about copies+efficiency

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
    let currentData = initialData;
    formulae.forEach(f => {
        let transformed = transform(currentData, f);
        results.push({formula: f, transformedData: transformed});
        currentData = transformed;
    });
    return results;
}