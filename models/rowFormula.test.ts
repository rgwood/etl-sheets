import {RowFormula} from './rowFormula';
import  {RowData} from './rowdata';
import {ColumnFormula} from './columnFormula';

function testRowFormula(input: RowData, expression: string, expected: RowData) {
    testRowFormulaWithColumnFormulae(input, expression, [], expected);
}

function testRowFormulaWithColumnFormulae(input: RowData, expression: string, columnFormulae: ColumnFormula[], expected: RowData) {
    let formula = new RowFormula(expression, columnFormulae);
    let result = formula.transform(input);
    expect(result).toEqual(expected);
}

test('add column to empty row', () =>{
    testRowFormula({}, `$foo='bar'`, {foo: 'bar'});
});

test('update single column', () =>{
    testRowFormula({foo: 'bar'}, `$foo='baz'`, {foo: 'baz'});
});

test('copy single column', () =>{
    testRowFormula({foo: 'bar'}, `$baz=$foo`, {foo: 'bar', baz: 'bar'});
});

test('add 2 columns', () =>{
    testRowFormula({foo: 1,  bar: 2}, `$baz= $bar + $foo`, {foo: 1, bar: 2, baz: 3});
});

test('empty expression changes nothing', () =>{
    testRowFormula({foo: 'bar'}, ``, {foo: 'bar'});
});

test('use column formula to add column to empty row', () =>{
    let cf = new ColumnFormula('foo', `'bar'`);
    testRowFormulaWithColumnFormulae({}, ``, [cf], {foo: 'bar'});
});

test('use column formula to copy column', () =>{
    let cf = new ColumnFormula('baz', `$foo`);
    testRowFormulaWithColumnFormulae({foo: 'bar'}, ``, [cf], {foo: 'bar', baz: 'bar'});
});

test('use column formula to take mid', () =>{
    let cf = new ColumnFormula('mid', `($ask + $bid) / 2`);
    testRowFormulaWithColumnFormulae({bid: 10, ask: 12}, ``, [cf], {bid: 10, ask: 12, mid: 11});
});