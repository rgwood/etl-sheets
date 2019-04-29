import React from "react";
import * as PropTypes from "prop-types";
import * as esprima from 'esprima';
import * as classNames from 'classnames';

// Header component to be used as default for all the columns.
export default class GridColumnHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formulaExpression: this.props.formulaExpression,
            expressionIsValid: this.expressionIsValidJs(this.props.formulaExpression)
        }
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="absolute pin-b">
            <div className="customHeaderLabel">
                <div>
                    {/* {this.props.formulaExpression} */}
                    {this.props.formulaExpression &&
                        <input className={classNames({ "text-green-dark": this.state.expressionIsValid },
                            { "text-red": !this.state.expressionIsValid },
                            "shadow appearance-none border rounded-sm w-4/5 p-1 leading-tight focus:outline-none focus:shadow-outline")}
                            type="text" onChange={this.onExpressionChanged.bind(this)} value={this.state.formulaExpression} />}
                </div>
                {this.props.displayName}</div>
        </div>
    }

    onExpressionChanged(event) {
        let expression = event.target.value;
        this.setState({ formulaExpression: expression, expressionIsValid: this.expressionIsValidJs(expression) })
        this.props.onFormulaExpressionChanged(event.target.value);
    };

    expressionIsValidJs(expression) {
        try {
            // Esprima does not allow return statements on their own
            let wrappedExpression = `function f() {${expression}}`
            esprima.parseScript(wrappedExpression);
            return true;
        } catch (error) {
            return false;
        }
    }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
GridColumnHeader.propTypes = {
    params: PropTypes.object
};