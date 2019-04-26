import {RowFormula} from './rowFormula';
import  {RowData} from './rowdata';

function testRowFormula(input: RowData, expression: string, expected: RowData) {
    let formula = new RowFormula(expression);
    let result = formula.expressionToFunction()(input);
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
