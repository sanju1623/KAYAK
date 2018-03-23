import React, {Component} from 'react';
import * as API from '../api/API';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
class VerticalchartUserTrack extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username:'o@o.com'
        };
    }

    componentDidMount(){
        API.UserTrackingGraph(this.state.username)
            .then((data) => {
                this.setState({
                    data: data
                });



                console.log(data)
            });
        // this.setState({data:this.props.PageStats});
        // console.log(this.state.data)
    }


    render () {
        return (
            <div>
                <LineChart layout="vertical" width={600} height={1500} data={this.state.data}
                           margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis type="seconds"/>
                    <YAxis dataKey="Pagename" type="category"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line dataKey="seconds" stroke="#8884d8" />
                </LineChart>
            </div>
        );
    }
}

export default VerticalchartUserTrack;