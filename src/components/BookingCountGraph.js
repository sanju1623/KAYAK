import React, {Component} from 'react';
import * as API from '../api/API';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip}  from 'recharts';
class BookingCountGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        API.BookingCountGraph()
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
                    <AreaChart width={600} height={400} data={this.state.data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <XAxis dataKey="category"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
                    </AreaChart>
                </div>
            </div>
        );
    }
}

export default BookingCountGraph;
