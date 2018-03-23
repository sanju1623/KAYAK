import React, {Component} from 'react';
import * as API from '../api/API';
import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';

class TopFlightStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        API.TopFlightStats()
            .then((data) => {
                this.setState({
                    data: data
                });
                console.log(data)
            });
        // this.setState({data:this.props.PageStats});
        // console.log(this.state.data)
    }
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-2 justify-content-md-center">
                    <BarChart width={600} height={300} data={this.state.data}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="operator"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="Revenue" fill="#8884d8" minPointSize={5}/>
                    </BarChart>
                </div>
            </div>
        );
    }
}

export default TopFlightStats;
