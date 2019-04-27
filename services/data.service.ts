import {ColumnTransformer} from '../models/columnTransformer';
import {RowData} from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { RowTransformer } from '../models/rowTransformer';

export function getInitialData(id: number): RowData[] {
    // todo: don't hardcode this, duh
    return [{
        ticker: "AAPL", bid: 3400, ask: 3500
    }, {
        ticker: "GOOG", bid: 310, ask: 320
    }, {
        ticker: "MSFT", bid: 700, ask: 720
    }];
}

export function getTransformers(id: number): TableTransformer[] {
    //todo: don't hardcode this, duh
    let midFormula = new ColumnTransformer('mid','($bid + $ask) / 2');
    let spreadFormula = new ColumnTransformer('spread','$ask - $bid');
    
    let transformer1 = new TableTransformer('', [midFormula, spreadFormula]);
    //copy each row
    let transformer2 = new TableTransformer('return [row, row];');
    return [transformer1, transformer2];
}