import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PlayerCard extends React.Component {
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
    
    render() {
        return (
            <Card>
                <CardHeader
                    title="Player 1"
                />
                <CardActions>
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <Checkbox
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        label="0"
                    />
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
                <CardHeader
                    title="Player 2"
                />
            </Card>
        );
    }
}
