import {Formula} from '../models/formula';
import {RowData} from '../models/rowdata';

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

export function getTransformationFormulae(id: number): Formula[] {
    //todo: don't hardcode this, duh
    return [new Formula('mid','($bid + $ask) / 2'), new Formula('spread','$ask - $bid')];
}