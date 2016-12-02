import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



export default class ToolbarExamplesSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };

        this.styles = {
            block: {
                width: 20,
            },
            checkbox: {
                marginBottom: 5,
                marginRight: 0,
            },
        };
    }

    handleChange(event, index, value){
        this.setState({value});
    }

    render() {
        return (
            <Toolbar>
                    <ToolbarGroup
                        style = {this.styles.block}>
                        <ToolbarTitle text="1"/>
                        <IconMenu
                            style = {this.styles.checkbox}
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                            >
                                <MenuItem primaryText="Give Turn" />
                                <MenuItem primaryText="Surrender" />
                            </IconMenu>
                            <ToolbarSeparator/>
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={this.styles.checkbox}
                            label="0"
                            labelPosition="left"
                        />
                    </ToolbarGroup>
                </Toolbar>
            );
        }
    }
