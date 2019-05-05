import * as esprima from 'esprima';

function wrapExpression(exp: string) {
    return `function f() {${exp}}`;
}

test('return statements can be parsed if we do the simplest possible wrapping in a function', () => {
    let exp = `return 6 * 7`;
    let wrapped = `function f() {${exp}}`
    esprima.parseScript(wrapped);
})

test('fails when wrapping a nonsense expression', () => {
    let exp = `return row[2`;
    let wrapped = `function f() {${exp}}`
    expect(() => esprima.parseScript(wrapped)).toThrow();
})