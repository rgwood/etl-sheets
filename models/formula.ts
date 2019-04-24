
export class Formula {
    public field: string; 
    public expression: string;

    constructor(field: string, expression: string) {
        this.field = field;
        this.expression = expression;
    }

    private convertExpressionToJsFunctionString() {
        return `return ${this.expression.replace(/\$/g, 'row.')}`
    }

    public expressionToFunction() { 
        return Function('row', this.convertExpressionToJsFunctionString());
    }
}