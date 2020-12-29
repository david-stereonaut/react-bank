import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Component } from "react";
import './Breakdown.css'

class Breakdown extends Component {

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

    formatData = (data) => {
        const newData = data.reduce((breakdown, t) => {
            if(this.state.filter[0]) {
                if (moment(t.date).format('M') === this.state.filter[0] &&
                    moment(t.date).format('YYYY') === this.state.filter[1]) {
                        this.makeBreakdownAndFormat(breakdown, t)
                }
            } else {
                this.makeBreakdownAndFormat(breakdown, t)
            }
            return breakdown
        }, {})
        return newData
    }

    seeAll = () => {
        this.setState({
            monthInput : null,
            filter: [0, 0]
        })
    }

    makeBreakdownAndFormat = (obj, d) => {
        const formatted = {...d, date: moment(d.date).format('DD/MM/YYYY')}
            if(obj[formatted.category]) {
                obj[formatted.category].total += formatted.amount
                obj[formatted.category].transactions.push(formatted)
            } else {
                obj[formatted.category] = {
                    total: formatted.amount,
                    transactions: [formatted]
                }
            }
        return obj
    }

    render() {
        const breakdown = this.formatData(this.props.data)
        return (
            <MuiPickersUtilsProvider moment={moment} utils={MomentUtils}>
            <div id="breakdown-container">
                <div className="date-picker">
                    <Box component="div" display="inline">
                        <DatePicker views={["year", "month"]} size="small" value={this.state.monthInput} name="monthInput" onChange={this.handleInputChange} label="See Specific Month" />
                    </Box>
                    <Button color="primary" variant="contained" onClick={this.seeAll} >See all</Button>
                </div>
                <div id="breakdown">
                    {Object.keys(breakdown).map(key => {
                        return (
                            <Accordion key={key}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${breakdown[key]}-content`}
                                    id={`${breakdown[key]}-header`}
                                >
                                    <Typography>{key}</Typography>
                                    <div className="total">
                                    <Typography>Total: </Typography>
                                    <Typography className={breakdown[key].total >=0 ? 'positive' : 'negative'}>&nbsp;₪{breakdown[key].total}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table size="small">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Vendor</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {breakdown[key].transactions.map((t) => (
                                                <TableRow key={t._id}>
                                                    <TableCell>{t.date}</TableCell>
                                                    <TableCell>{t.amount}</TableCell>
                                                    <TableCell>{t.vendor}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
            </div>
            </MuiPickersUtilsProvider>
        )
    }
}

export default Breakdown