import {Transformation} from './transformation';
import {RowData} from './rowdata';
import {Formula} from './formula';
import {transformMultiple} from '../services/transformer.service';

export class ScalarTransformation implements Transformation {
    constructor(private formulae: Formula[]) {
    }

    transform(data: RowData[]): RowData[] {
        return transformMultiple(data, this.formulae);
    }
}