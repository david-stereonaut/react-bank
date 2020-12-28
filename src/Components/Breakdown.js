import { Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Component } from "react";
import './Breakdown.css'

class Breakdown extends Component {

    makeBreakdown = data => {
        const breakdown = {}
        data.forEach(d => {
            if(breakdown[d.category]) {
                breakdown[d.category].total += d.amount
                breakdown[d.category].transactions.push(d)
            } else {
                breakdown[d.category] = {
                    total: d.amount,
                    transactions: [d]
                }
            }
        })
        return breakdown
    }

    render() {
        const breakdown = this.makeBreakdown(this.props.data)
        return (
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
        )
    }
}

export default Breakdown