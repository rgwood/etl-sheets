import { RowData } from './rowData';
import { ColumnTransformer } from './columnTransformer';
import { RowTransformer } from './rowTransformer';
import * as esprima from 'esprima';

// A transformer which operates on an entire row. Can include multiple column transformers
export class TableTransformer {
    public expressionIsValid: boolean = true;

    private _expression: string = '';
    get expression(): string {
        return this._expression;
    }
    set expression(exp: string) {
        try {
            // Esprima does not allow return statements on their own
            let wrappedExpression = `function f() {${exp}}`
            esprima.parseScript(wrappedExpression);
            this.expressionIsValid = true;
        } catch (error) {
            this.expressionIsValid = false;
        }

        this._expression = exp;
    }

    constructor(expression: string, public columnFormulae: ColumnTransformer[] = [], public description?: string, public failed?: boolean) {
        this.expression = expression;
    }

    public expressionError: boolean = false;

    public transform(table: RowData[]): RowData[] {
        let rowTransformer = new RowTransformer(this.expression, this.columnFormulae)
        let results: RowData[] = [];
        table.forEach(row => {
            let result = rowTransformer.transform(row);

            if (result) {
                if(result instanceof Array) {
                    (result as RowData[]).forEach(rd => results.push(rd));
                } else { //just a single row
                    results.push(result as RowData);
                }
            }
        });
        return results;
    }
}