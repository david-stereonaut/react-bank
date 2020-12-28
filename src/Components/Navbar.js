import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { Component } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu'

class Navbar extends Component {

    constructor() {
        super()
        this.state = {
          anchorEl: null
        }
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }
    
    handleClose = () => {
        this.setState({anchorEl: null})
    }

    render() {
        const balanceColor = this.props.balance >= 500 ? 'green' : 'red'
        return (
            <div id="navbar">
                <AppBar position="static" color="primary">
                    <Toolbar className="navbar">
                        <IconButton edge="start" color="inherit" aria-controls="menu" aria-haspopup="true" onClick={this.handleClick}>
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h5">React Bank</Typography>
                        <p>Balance: <span style={{color: balanceColor}}>₪{this.props.balance}</span></p>
                    </Toolbar>
                </AppBar>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}><Link to="/transactions" >Transactions</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/operations" >Operations</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/breakdown" >Breakdown</Link></MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Navbar