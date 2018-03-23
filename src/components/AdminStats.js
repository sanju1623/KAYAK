import React, {Component} from 'react';
import * as API from '../api/API';
import BarChartData from "./TopFlightStats";
import LineChartData from "./LineChartData";
import PageCountGraph from "./PageCountGraph";
import PieChartData from "./PieChartData";
import BookingCountGraph from "./BookingCountGraph";
import RevenueGraph from "./RevenueGraph";
import TopFlightStats from "./TopFlightStats";
import TopHotelStats from "./TopHotelStats";
import UserTrackingGraph from "./UserTrackingGraph";

import '../cssfiles/AdminStats.css';
//import VerticalchartUserTrack from "./VerticalchartUserTrack";

class AdminStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageStats: []
        }
    }


    componentDidMount(){
        document.title = `Admin - Stats`;

    }


    componentWillMount()
    {
        API.getAdminSession()
            .then((data) => {
                //console.log(data.user);
                if(data==401)
                {
                    this.props.history.push("/");
                }

            });

    }



    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                <div className='col-lg-8 linechart'>
                <LineChartData />
                </div>
                </div>
                <div className='row'>
                <div className='col-lg-4 piechart'>
                <PieChartData />
                </div>
                </div>
                <div className='row'>
                    <div className=" row col-md-4 justify-content-md-center">
                        <PageCountGraph />
                    </div>
                </div>
                <div className='row'>
                <div className=" row col-md-12 justify-content-md-center">
                <BookingCountGraph />
                </div>
                </div>
                <div className='row'>
                <div className=" row col-md-8 justify-content-md-center">
                <RevenueGraph />
                </div>
                </div>
                <div className='row'>
                <div className=" row col-md-8 justify-content-md-center">
                <TopFlightStats />
                </div>
                </div>
                <div className='row'>
                <div className=" row col-md-8 justify-content-md-center">
                <TopHotelStats />
                </div>
                </div>
                <div className='row'>
                    <div className=" row col-md-8 justify-content-md-center">
                        <UserTrackingGraph />
                    </div>
                </div>

            </div>


        );
    }
}

export default AdminStats;
