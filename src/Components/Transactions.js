import './Transactions.css'
import { Component } from "react";
// import Transaction from "./Transaction"; //Got rid of the Transaction Component to use Material UI Data Grid instead
import { DataGrid, } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

class Transactions extends Component {

    deleteTransaction = (id) => {
        console.log(id)
        this.props.deleteTransaction(id)
    }

    render() {
        return (
            <div id="transactions">
                <DataGrid pageSize={10} rowsPerPageOptions={[5, 10, 20]}
                    columns={[{ field: 'id', hide: true },
                        {
                            field: 'date',
                            flex: 1,
                            headerName: 'Date',
                        }, { 
                            field: 'amount',
                            headerName: 'Amount',
                            flex: 1,
                            cellClassName: (params) => {
                                return params.value >=0 ? 'positive' : 'negative'
                            }
                        }, {
                            field: 'vendor',
                            flex: 1,
                            headerName: 'Vendor',
                        }, {
                            field: 'category',
                            flex: 1,
                            headerName: 'Category',
                        }, {
                            field: '_id',
                            headerName: 'Delete',
                            disableClickEventBubbling: true,
                            flex: 0.5,
                            renderCell: (params) => (
                                <Button
                                color="secondary"
                                onClick={() => this.deleteTransaction(params.value)}
                                variant="contained"
                                size="small"
                                >
                                Delete
                                </Button>
                            ),
                        },
                    ]}
                    rows={this.props.data.map(d => {
                        return ({...d, id: d._id})
                    })}
                />
            </div>
        )
    }
}

export default Transactions