import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
const cardStyle = {
        display: 'block',
        width: '60vw',
        height: '12vw',
    }
class AdminListings extends Component {

    render() {
        return (
            <div className="container-fluid">
            <Card style={cardStyle} className="row mb-2">
            <CardTitle title="Oops!" subtitle="Results empty" />
              <CardText>
                There are no results that match the search Filters. Please try again.
              </CardText>
            </Card>
          </div>
        );
    }
}
export default AdminListings;
