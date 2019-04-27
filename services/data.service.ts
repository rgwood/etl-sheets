import {ColumnTransformer} from '../models/columnTransformer';
import {RowData} from '../models/rowData';

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

export function getTransformationFormulae(id: number): ColumnTransformer[] {
    //todo: don't hardcode this, duh
    return [new ColumnTransformer('mid','($bid + $ask) / 2'), new ColumnTransformer('spread','$ask - $bid')];
}