import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import HotelSearchNavBar from "./HotelSearchNavBar";
import HotelOptions from "./HotelOptions";
import HotelCardP from "./HotelCardP";
import EmptyResults from "./EmptyResults";
import * as API from '../api/API';
const d=new Date;

class Hotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelResults :[],
            totalHotelResults:[],
            emptyResults:false,
            fromTime:'',
            toTime:'',
            loggedin:''
        }
    };


    HotelPayment=(hotelDetails) =>
    {

        //var next=nextTime.now();
console.log('----------in hotel payment---');

        console.log('----------in hotel payment---');
        var next=new Date();
       // console.log('---------HOTELS TRACK---------------');

         this.props.HotelPayment(hotelDetails);
        //
    };

    componentWillMount()
    {
        if(this.props.hotelList.length==0)
        {
            this.props.history.push('/');
        }
        this.setState({
            hotelResults:this.props.hotelList,
            totalHotelResults:this.props.hotelList,
        });
var fromTime=new Date();
this.setState({
   fromTime:fromTime
});
        }






    componentWillUnmount()
    {

        var next = new Date();
        var data={};
        data.fromTime=this.state.fromTime.toString();
        data.toTime=next.toString();
        data.page='Hotel PAGE';
        API.trackHotel(data)
            .then((data) => {
                //console.log(data.user);
                console.log('--------------');
                console.log("successfully HOTEL PAGE Homepage");
                console.log('--------------');
            });
    }







    priceFilter = (filterPrice) => {
        console.log("filterPrice in Hotels: "+filterPrice);
        // this.setState({filterPrice: filterPrice});
        var priceFilterArray = this.state.totalHotelResults.filter(val => {return val.price < filterPrice;});
        if(priceFilterArray.length <= 0 ){
            console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
        console.log("After Filter in cars: "+priceFilterArray);
        this.setState({hotelResults: priceFilterArray});
    };
    starFilter = (numberOfStars) => {
        console.log("filterPrice in Hotels: "+numberOfStars);
        if(numberOfStars == 0){
            console.log("All results");
            // console.log('------------------');
            // console.log(this.props.hotelList);
            //   console.log('------------------');

            this.setState({hotelResults: this.props.hotelList});


        }
        else{
            var starFilterArray = this.state.totalHotelResults.filter(val => {return val.Ratings == numberOfStars;});
            if(starFilterArray.length <= 0 ){
                console.log("Empty array ");
                this.setState({emptyResults: true});
            }
            else{
                this.setState({emptyResults: false});
            }
            console.log("After Filter in cars: "+starFilterArray);
            this.setState({hotelResults: starFilterArray});
        }
    };

    render() {
        return (
            <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
                <div className="row">
                    <HotelSearchNavBar/>
                </div>
                <div className="d-flex p-2">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/car-map.png"/></div>
                            <div className="pt-2 pr-2"><HotelOptions priceFilter={this.priceFilter} starFilter={this.starFilter} /></div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/hotel-extra1.png"/></div>
                            <div className="pt-2 pr-2">
                                {
                                    this.state.emptyResults
                                        ?<EmptyResults />
                                        :<HotelCardP HotelPayment={this.HotelPayment} hotelResults = {this.state.hotelResults}/>
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/flight-extra1.png"/></div>
                            <div className="pt-3 pr-2"><img src="/images/hotel-extra.png"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Hotel);
