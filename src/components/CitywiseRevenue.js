import React, {Component} from 'react';
import * as API from '../api/API';
import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';

// const data = [
//     {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//     {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//     {name: 'Page C', uv: 2000, pv: 8, amt: 2290},
//     {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//     {name: 'Page E', uv: 18, pv: 4800, amt: 2181},
//     {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//     {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];


class CitywiseRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        API.CitywiseRevenue()
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
                        <XAxis dataKey="city"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="Amount" fill="#8884d8" minPointSize={5}/>

                    </BarChart>
                </div>
            </div>
        );
    }
}

export default CitywiseRevenue;
