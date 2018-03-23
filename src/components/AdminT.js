import React from 'react';
import * as API from '../api/API';
import BarChartData from "./TopFlightStats";
import LineChartData from "./LineChartData";
import PageCountGraph from "./PageCountGraph";
import PieChartData from "./PieChartData";
import BookingCountGraph from "./BookingCountGraph";
import RevenueGraph from "./RevenueGraph";
import { WidthProvider, Responsive } from 'react-grid-layout';
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import { Route, withRouter } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import UserTrackingGraph from "./UserTrackingGraph";
import TopHotelStats from "./TopHotelStats";
import TopFlightStats from "./TopFlightStats";
import TopCarStats from "./TopCarStats";
import CitywiseRevenue from "./CitywiseRevenue";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const customContentStyle = {
    width: '50%',
    maxWidth: 'none',
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
var charts = {};
var elementCount =[];

class AdminT extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        rowHeight: 170,
        rowWidth: 200,
        onLayoutChange: function() {},
    };
    handleOpen = () => {
        this.setState({open: true});
    };

    handleCloseDialog = () => {
        this.setState({open: false});
    };
    constructor(props) {
        super(props);
        API.getAdminSession()
            .then((data) => {
                if(data==401)
                {
                    this.props.history.push("/");
                }
            });
        this.state = {
            items: elementCount.map(function(i, key, list) {
                console.log("i value in items: "+i.toString());
                return {i: i.toString(), x: i * 2, y: 0, w: 3, h: 2, add: i === (list.length - 1).toString()};
            }),
            newCounter: 0,
            openDrawer: false,
            PageStats: [],
            open: false,
            username:'',
        };
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});
    handleUserTrackingInput = () => this.setState({open: false,});
    AddUsername = (event) => {this.setState({username: event.target.value});};
    handleClose = () => this.setState({openDrawer: false});
    createElement(el) {
        const removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
        };
        var i = el.add ? '+' : el.i;
        return (
            <div key={i} data-grid={el}>
                {el.add ?
                    <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
                    : <span className="text">{Object.keys(charts).length>0 ? charts[i].element : null }</span>}{console.log("charts length"+Object.keys(charts).length)}{console.log("i value: "+i)}
                <span className="remove mb-2" style={removeStyle} onClick={this.onRemoveItem.bind(this,i)}><Delete color={cyan500} viewBox="0 0 20 20" onClick={this.onRemoveItem.bind(this,i)}/></span>
            </div>
        );
    }

    onAddItem(chart) {
        console.log("chart value: "+chart);
        var chartElement = {};
        var height,width;
        if(chart === "TopFlightStats"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <BarChartData/>
            });
            height=2;
            width=5;
        }
        else if(chart === "PageCountGraph"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <PageCountGraph/>
            });
            height=2;
            width=5;
        }
        else if(chart === "BookingCountGraph"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <BookingCountGraph/>
            });
            height=2;
            width=5;
        }

        else if(chart === "RevenueGraph"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <RevenueGraph/>
            });
            height=2;
            width=3;
        }

        else if(chart === "UserTrackingGraph"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <UserTrackingGraph username={this.state.username}/>
            });
            height=2;
            width=3;
        }

        // else if(chart === "RevenueGraph"){
        //     chartElement = ({
        //         "id" : this.state.newCounter + 1,
        //         "element" : <RevenueGraph/>
        //     });
        //     height=2;
        //     width=5;
        // }

        else if(chart === "TopHotelStats"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <TopHotelStats/>
            });
            height=2;
            width=5;
        }

        else if(chart === "TopCarStats"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <TopCarStats/>
            });
            height=2;
            width=5;
        }

        else if(chart === "LineChartData"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <LineChartData/>
            });
            height=2;
            width=5;
        }
        else if(chart === "citywiserevenue"){
            chartElement = ({
                "id" : this.state.newCounter + 1,
                "element" : <CitywiseRevenue/>
            });
            height=2;
            width=5;
        }


        charts[this.state.newCounter + 1] = chartElement;
        //console.log('Chart Data in counter 1 '+charts[0].element+charts[1].element);
        //console.log("charts: %s", JSON.stringify(charts));
        elementCount.push(this.state.newCounter + 1);
        console.log('Chart Element Array '+elementCount);
        this.setState({
            openDrawer: false,
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: (this.state.newCounter + 1).toString(),
                x: this.state.items.length * 2 % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: width,
                h: height
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }
    onRemoveItem(i) {
        var currentCounter= this.state.newCounter ;
        console.log('removing', i);
        delete charts[i];
        this.setState({
            items: _.reject(this.state.items, {i: i}),
            newCounter: currentCounter - 1,
        });

    }
    callThis = (e) => {
        console.log("Input Username"+this.selectVal.value);
        this.setState({
            open: false,
            username:this.selectVal.value},()=>{
            this.onAddItem("UserTrackingGraph");
        });

    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.callThis}
            />,
        ];

        return (
            <div className="container-fluid big">
                <div className="row justify-content-end">
                    <FloatingActionButton onClick={this.handleToggle}>
                        <ContentAdd />
                    </FloatingActionButton>

                </div>
                <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}
                                           {...this.props}>
                    {_.map(this.state.items, (el) => this.createElement(el))}
                </ResponsiveReactGridLayout>
                <Drawer
                    docked={false}
                    width={200}
                    openSecondary={true}
                    open={this.state.openDrawer}
                    onRequestChange={(openDrawer) => this.setState({openDrawer})}
                >
                    <MenuItem onClick={this.onAddItem.bind(this,"TopFlightStats")}>Top Flight</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"PageCountGraph")}>Page Count Graph</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"LineChartData")}>Page Count Line Graph</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"BookingCountGraph")}>Booking Count Graph</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"RevenueGraph")}>Revenue Graph</MenuItem>
                    <MenuItem onClick={this.handleOpen}>User Tracking Graph</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"TopHotelStats")}>Top Hotels</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"TopCarStats")}>Top Cars</MenuItem>
                    <MenuItem onClick={this.onAddItem.bind(this,"citywiserevenue")}>CityWise Revenue</MenuItem>

                </Drawer>
                <Dialog
                    title="Enter the username for Tracking"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                    {/*<TextField*/}
                        {/*floatingLabelText="Username"*/}
                        {/*//onChange={this.AddHotelID}*/}
                        {/*onChange={this.AddUsername.bind(this)}/>*/}
                    <input type="text" ref={(input) => this.selectVal = input}/>

                </Dialog>
            </div>
        );
    }
}

export default withRouter(AdminT);