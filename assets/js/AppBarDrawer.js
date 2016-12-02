import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


export default class AppBarDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
       this.setState({open: !this.state.open})
   }

   handleClear(){
       hexagonGrid.clear();
   }

   handleRandom(){
       hexagonGrid.randomize();
   }

  // handleToggle = () => this.setState({open: !this.state.open});

  render() {

    return (
      <div>
        <AppBar
        title="Automata.Life"
        onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
        />
        <Drawer open={this.state.open}>
            <MenuItem onTouchTap = {this.handleRandom.bind(this)}>Randomize</MenuItem>
            <MenuItem onTouchTap = {this.handleClear.bind(this)}>Clear</MenuItem>
            <MenuItem onTouchTap = {this.handleToggle.bind(this)}>Close</MenuItem>
        </Drawer>
      </div>
    );
  }
}
