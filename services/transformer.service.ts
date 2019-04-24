import {Formula} from '../models/formula';
import {RowData} from '../models/rowdata';

export function transform(data: RowData[], formula: Formula): RowData[] {
    // very hacky way to do a deep clone
    let cloned: RowData[] = JSON.parse(JSON.stringify(data));

    cloned.forEach(row => {
        row[formula.field] = formula.expressionToFunction()(row);
    });

    return cloned;
}