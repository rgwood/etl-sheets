import {ColumnTransformer} from '../models/columnTransformer';
import {RowData} from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { RowTransformer } from '../models/rowTransformer';

export function getInitialData(id: number): RowData[] {
    // todo: don't hardcode this, duh
    return [{
        ticker: "AAPL Equity", bid: 3400, ask: 3500
    }, {
        ticker: "GOOG Equity", bid: 310, ask: 320
    }, {
        ticker: "MSFT Equity", bid: 700, ask: 720
    }, {
        ticker: "CSCO Equity", bid: 227, ask: 229
    }];
}

export function getTransformers(id: number): TableTransformer[] {
    //todo: don't hardcode this, duh
    let midFormula = new ColumnTransformer('mid','($bid + $ask) / 2');
    let spreadFormula = new ColumnTransformer('spread','$ask - $bid');
    
    let transformer1 = new TableTransformer('', [midFormula, spreadFormula],'Calculate mid+spread');
    let transformer2 = new TableTransformer('filterOut($spread > 50)',[],'Remove spread outliers');
    
    let internalIdColTransformer = new ColumnTransformer('internalID','lookupInternalId($ticker)');
    let transformer3 = new TableTransformer('',[internalIdColTransformer],'Lookup internal ID',true);
    
    let removeColumns = `delete $ticker; delete $bid; delete $ask`;
    let transformer4 = new TableTransformer(removeColumns,[],'Remove unused columns');
    
    return [transformer1, transformer2, transformer3, transformer4];
}