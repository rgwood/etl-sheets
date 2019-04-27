import React from "react";
import * as PropTypes from "prop-types";

// Header component to be used as default for all the columns.
export default class CustomHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formulaExpression: this.props.formulaExpression
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
            <input className="shadow appearance-none border rounded-sm w-4/5 p-1 text-green-dark leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={this.onExpressionChanged.bind(this)} value={this.state.formulaExpression}/>}
            </div>
            {this.props.displayName}</div>
        </div>
    }

    onExpressionChanged(event) {
        this.setState({formulaExpression: event.target.value})
        this.props.onFormulaExpressionChanged(event.target.value);
    };
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
CustomHeader.propTypes = {
    params: PropTypes.object
};