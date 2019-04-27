import {RowTransformer} from './rowTransformer';
import  {RowData} from './rowData';
import {ColumnTransformer} from './columnTransformer';
import {TableTransformer} from './tableTransformer';


function testTransformer(input: RowData[], transformer: RowTransformer, expected: RowData[]) {
    let tableTransformer = new TableTransformer(transformer);
    expect(tableTransformer.transform(input)).toEqual(expected);
}

test('', () =>{
    testTransformer([], new RowTransformer(''), []);
});

test('empty table unchanged', () =>{
    testTransformer([], new RowTransformer(''), []);
});

test('update single column', () =>{
    testTransformer([{foo: 'bar'}, {foo: 'bar'}], new RowTransformer(`$foo='baz';`), [{foo: 'baz'},{foo: 'baz'}]);
});

test('split row into 2', () => {
    testTransformer([{foo: 'bar'}], new RowTransformer(`return [row, row];`), [{foo: 'bar'},{foo: 'bar'}]);
});

test('add column then use column transformer', () => {
    let columnTransformer = new ColumnTransformer('foo', `'baz'`);
    testTransformer([{}], new RowTransformer(`$foo='bar';`, [columnTransformer]), [{foo: 'baz'}]);
});

test('split row into 2 then use column transformer', () => {
    let columnTransformer = new ColumnTransformer('bar', `'baz'`);
    testTransformer([{foo: 'bar'}], new RowTransformer(`return [row, row];`, [columnTransformer]), [{foo: 'bar', bar: 'baz'},{foo: 'bar', bar:'baz'}]);
});