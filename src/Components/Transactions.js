import './Transactions.css'
import { Component } from "react";
// import Transaction from "./Transaction"; //Got rid of the Transaction Component to use Material UI Data Grid instead
import { DataGrid, } from '@material-ui/data-grid';
import { Box, Button } from "@material-ui/core";
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

class Transactions extends Component {

    constructor(){
        super()
        this.state = {
            monthInput : null,
            filter: [0, 0]
        }
    }


    handleInputChange =  (event) => {
        const value = event
        this.setState({
            monthInput: value,
            filter: [event.format('M'), event.format('YYYY')]
        })
    }

    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }

    formatData = (data) => {
        const newData = data.reduce((formatedData, t) => {
            if(this.state.filter[0]) {
                if (moment(t.date).format('M') === this.state.filter[0] &&
                    moment(t.date).format('YYYY') === this.state.filter[1]) {
                        const formattedTransaction = {...t, id: t._id, date: moment(t.date).format('DD/MM/YYYY')}
                        formatedData.push(formattedTransaction)
                }
            } else {
                const formattedTransaction = {...t, id: t._id, date: moment(t.date).format('DD/MM/YYYY')}
                formatedData.push(formattedTransaction)
            }
            return formatedData
        }, [])
        return newData
    }

    seeAll = () => {
        this.setState({
            monthInput : null,
            filter: [0, 0]
        })
    }

    render() {
        return (
            <MuiPickersUtilsProvider moment={moment} utils={MomentUtils}>
            <div id="transaction-container">
                <div className="date-picker">
                    <Box component="div" display="inline">
                        <DatePicker views={["year", "month"]} size="small" value={this.state.monthInput} name="monthInput" onChange={this.handleInputChange} label="See Specific Month" />
                    </Box>
                    <Button color="primary" variant="contained" onClick={this.seeAll} >See all</Button>
                </div>
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
                                flex: 1,
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
                        rows={this.formatData(this.props.data)}
                    />
                </div>
            </div>
            </MuiPickersUtilsProvider>
        )
    }
}

export default Transactions