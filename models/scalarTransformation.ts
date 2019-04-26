import {Transformation} from './transformation';
import {RowData} from './rowdata';
import {ColumnFormula} from './columnFormula';
import {transformMultiple} from '../services/transformer.service';

export class ScalarTransformation implements Transformation {
    constructor(private formulae: ColumnFormula[]) {
    }

    transform(data: RowData[]): RowData[] {
        return transformMultiple(data, this.formulae);
    }
}