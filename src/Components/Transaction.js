import { Component } from "react";

class Transaction extends Component {

    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.data)
    }

    render() {
        const data = this.props.data
        const color = data.amount >= 0 ? 'green' : 'red'
        return (
            <div className="transaction">
                <p style={{color}}>amount: {data.amount}</p>
                <p>vendor: {data.vendor}</p>
                <p>category: {data.category}</p>
                <button onClick={this.deleteTransaction}>Delete</button>
            </div>
        )
    }
}

export default Transaction