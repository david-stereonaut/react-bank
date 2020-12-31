import { TextField, Button, Box, Snackbar, IconButton } from "@material-ui/core";
import { Component } from "react";
import './Operations.css'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amountInput: '',
            vendorInput: '',
            categoryInput: '',
            dateInput: moment().format('YYYY-MM-DD'),
            showSuccess: false,
            showNotEnough: false,
            showProblem: false
        }
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }
    
    deposit = () => {
        if (!this.state.amountInput ||
            !this.state.vendorInput ||
            !this.state.categoryInput) {
            this.setState({
                showProblem: true
            })
        } else {
            this.props.deposit({
                amount: this.state.amountInput,
                vendor: this.state.vendorInput,
                category: this.state.categoryInput,
                date: this.state.dateInput
            })
            this.setState({
                amountInput: '',
                vendorInput: '',
                categoryInput: '',
                dateInput: moment().format('YYYY-MM-DD'),
                showSuccess: true
            })
        }
    }

    withdraw = () => {
        if (!this.state.amountInput ||
            !this.state.vendorInput ||
            !this.state.categoryInput) {
            this.setState({
                showProblem: true
            })
        } else if (this.props.balance - this.state.amountInput < 500) {
            this.setState({
                showNotEnough: true
            })
        } else {
            this.props.withdraw({
                amount: this.state.amountInput,
                vendor: this.state.vendorInput,
                category: this.state.categoryInput,
                date: this.state.dateInput
            })
            this.setState({
                amountInput: '',
                vendorInput: '',
                categoryInput: '',
                dateInput: moment().format('YYYY-MM-DD'),
                showSuccess: true
            })
        }
    }

    handleSnackbarClose = () => {
        this.setState({
            showNotEnough: false,
            showSuccess: false,
            showProblem: false
        })
    }

    render() {
        return (
            <div id="operations">
                <Box component="div" display="inline">
                    <TextField size="small" type="number" value={this.state.amountInput} name="amountInput" onChange={this.handleInputChange} label="Amount" />
                </Box>
                <Box component="div" display="inline">
                    <TextField size="small" type="text" value={this.state.vendorInput} name="vendorInput" onChange={this.handleInputChange} label="Vendor" />
                </Box>
                <Box component="div" display="inline">
                    <TextField size="small" type="text" value={this.state.categoryInput} name="categoryInput" onChange={this.handleInputChange} label="Category" />
                </Box>
                <Box component="div" display="inline">
                    <TextField size="small" type="date" value={this.state.dateInput} name="dateInput" onChange={this.handleInputChange} label="Date" />
                </Box>
                <Box component="div" display="inline">
                    <Button variant="contained" color="secondary" onClick={this.withdraw}>Withdraw</Button>
                </Box>
                <Box component="div" display="inline">
                    <Button variant="contained" color="secondary" onClick={this.deposit}>Deposit</Button>
                </Box>
                <Snackbar
                    className="success-bar"
                    open={this.state.showSuccess}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}
                    message="Transaction successful"
                    action={
                        <React.Fragment>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                    }
                />
                <Snackbar
                    className="fail-bar"
                    open={this.state.showNotEnough}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}
                    message="Balance is too low!"
                    action={
                        <React.Fragment>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                    }
                />
                <Snackbar
                    className="fail-bar"
                    open={this.state.showProblem}
                    autoHideDuration={5000}
                    onClose={this.handleSnackbarClose}
                    message="All fields must be full"
                    action={
                        <React.Fragment>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}

export default Operations