import  {RowData} from './rowData';
import {ColumnTransformer} from './columnTransformer';
import {TableTransformer} from './tableTransformer';

function testTransformer(input: RowData[], transformer: TableTransformer, expected: RowData[]) {
    expect(transformer.transform(input)).toEqual(expected);
}

test('', () =>{
    testTransformer([], new TableTransformer(''), []);
});

test('empty table unchanged', () =>{
    testTransformer([], new TableTransformer(''), []);
});

test('update single column', () =>{
    testTransformer([{foo: 'bar'}, {foo: 'bar'}], new TableTransformer(`$foo='baz';`), [{foo: 'baz'},{foo: 'baz'}]);
});

test('split row into 2', () => {
    testTransformer([{foo: 'bar'}], new TableTransformer(`return [row, row];`), [{foo: 'bar'},{foo: 'bar'}]);
});

test('add column then use column transformer', () => {
    let columnTransformer = new ColumnTransformer('foo', `'baz'`);
    testTransformer([{}], new TableTransformer(`$foo='bar';`, [columnTransformer]), [{foo: 'baz'}]);
});

test('split row into 2 then use column transformer', () => {
    let columnTransformer = new ColumnTransformer('bar', `'baz'`);
    testTransformer([{foo: 'bar'}], new TableTransformer(`return [row, row];`, [columnTransformer]), [{foo: 'bar', bar: 'baz'},{foo: 'bar', bar:'baz'}]);
});

test('split row into 2 then use column transformer - 2', () => {
    let input: RowData[] = [{foo: 'foo'}];
    let expression  = `return [row, row];`;
    let columnTransformer = new ColumnTransformer('bar',`'bar'`);
    testTransformer(input, new TableTransformer(expression, [columnTransformer]), [{foo: 'foo', bar: 'bar'},{foo: 'foo', bar:'bar'}]);
});