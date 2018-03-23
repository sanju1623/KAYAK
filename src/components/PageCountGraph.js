import React, {Component} from 'react';
import * as API from '../api/API';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {PropTypes} from 'react';
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
};

TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};
class PageCountGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        API.GetPageStats()
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
            <div className="container-fluid">
                    <div className="col-md-2 justify-content-md-center">
                        <BarChart width={600} height={300} data={this.state.data[0]}
                                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="label"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar/>} label/>
                        </BarChart>
                    
                </div>
            </div>
        );
    }
}

export default PageCountGraph;
