import {RowData} from './rowdata';

export abstract class Transformation {
    abstract transform(data: RowData[]) : RowData[];
}