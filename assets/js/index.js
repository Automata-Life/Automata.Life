import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import ALAppBar from './ALAppBar';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <ALAppBar />
      <RaisedButton label="Test" />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
