import {RowTransformer} from './rowTransformer';
import  {RowData} from './rowData';
import {ColumnTransformer} from './columnTransformer';

function testRowTransformer(input: RowData, expression: string, expected?: RowData | RowData[]) {
    testRowTransformerWithColumnFormulae(input, expression, [], expected);
}

function testRowTransformerWithColumnFormulae(input: RowData, expression: string, columnFormulae: ColumnTransformer[], expected?: RowData | RowData[]) {
    let formula = new RowTransformer(expression, columnFormulae);
    let result = formula.transform(input);
    expect(result).toEqual(expected);
}

test('add column to empty row', () =>{
    testRowTransformer({}, `$foo='bar'`, {foo: 'bar'});
});

test('remove row', () =>{
    testRowTransformer({foo: 'bar'}, `return undefined;`, undefined);
});


test('update single column', () =>{
    testRowTransformer({foo: 'bar'}, `$foo='baz'`, {foo: 'baz'});
});

test('copy single column', () =>{
    testRowTransformer({foo: 'bar'}, `$baz=$foo`, {foo: 'bar', baz: 'bar'});
});

test('add 2 columns', () =>{
    testRowTransformer({foo: 1,  bar: 2}, `$baz= $bar + $foo`, {foo: 1, bar: 2, baz: 3});
});

test('empty expression changes nothing', () =>{
    testRowTransformer({foo: 'bar'}, ``, {foo: 'bar'});
});

test('split row into 2 rows', () => {
    testRowTransformer({foo: 'bar'}, `return [row, row];`, [{foo: 'bar'}, {foo: 'bar'}]);
});

test('filter expression returns nothing', () =>{
    testRowTransformer({foo: 'bar'}, `return undefined;`, undefined);
});

test('use column formula to add column to empty row', () =>{
    let cf = new ColumnTransformer('foo', `'bar'`);
    testRowTransformerWithColumnFormulae({}, ``, [cf], {foo: 'bar'});
});

test('use column formula to copy column', () =>{
    let cf = new ColumnTransformer('baz', `$foo`);
    testRowTransformerWithColumnFormulae({foo: 'bar'}, ``, [cf], {foo: 'bar', baz: 'bar'});
});

test('use column formula to take mid', () =>{
    let cf = new ColumnTransformer('mid', `($ask + $bid) / 2`);
    testRowTransformerWithColumnFormulae({bid: 10, ask: 12}, ``, [cf], {bid: 10, ask: 12, mid: 11});
});

test('row expression and 2 column formulae',() => {
    let cf1 = new ColumnTransformer('mid', `($ask + $bid) / 2`);
    let cf2 = new ColumnTransformer('spread', `$ask - $bid`);

    let rowExp = `$bid = 10; $ask = 12`;

    testRowTransformerWithColumnFormulae({}, rowExp, [cf1, cf2], {bid: 10, ask: 12, mid: 11, spread: 2});
});