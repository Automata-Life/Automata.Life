import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import AppBarDrawer from './AppBarDrawer';
import Toolbar from './Toolbar';
import PlayerCard from './PlayerCard';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

// injectTapEventPlugin();

const GameMenu = () => (
    <MuiThemeProvider>
    <AppBarDrawer />
    </MuiThemeProvider>
    );

const GameToolbar = () => (
    <MuiThemeProvider>
    <Toolbar />
    </MuiThemeProvider>
    );

const GameCard = () => (
    <MuiThemeProvider>
        <PlayerCard />
    </MuiThemeProvider>
)

ReactDOM.render(
    <div>
    <GameMenu />
    {/* <GameCard /> */}
    </div>,
    document.getElementById('menu')

);
