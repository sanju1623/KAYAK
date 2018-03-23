import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import CarSearchNavBar from "./CarSearchNavBar";
import CarOptions from "./CarOptions";
import CarCard from "./CarCard";
import * as API from '../api/API';
import EmptyResults from "./EmptyResults";
class Cars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterPrice:'',
            carResults :[],
            totalCarResults:[],
            emptyResults:false,
            carTime:'',
            fromTime:'',
            loggedin:''
        };

    };

    filterOption = (filterPrice) => {
       // console.log("filterPrice in Cars: "+filterPrice);
        this.setState({filterPrice: filterPrice});
        var priceFilterArray = this.state.totalCarResults.filter(val => {return val.carPrice < filterPrice;});
        if(priceFilterArray.length <= 0 ){
         //   console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
       // console.log("After Filter in cars: "+priceFilterArray);
        this.setState({carResults: priceFilterArray});
    };

    TypeFilterOption = (filterOptions) => {
       // console.log("filterType in Cars" + filterOptions);
        var carFilterArray = [];
        for(var i=0;i<filterOptions.length;i++){
             carFilterArray= carFilterArray.concat(this.state.totalCarResults.filter(car => {return car.carType == filterOptions[i];}));
 //           console.log("carFilterArray after concat "+ carFilterArray[0].carType);
        }

        if(carFilterArray.length <= 0 ){
    //        console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
    //    console.log("After Type Filter in cars: "+carFilterArray);
        this.setState({carResults: carFilterArray});
    };

    carPayment=(carPaymentdetails)=>{


        console.log('--------in cars---------');
        var d=new Date();
        carPaymentdetails.carPage=d;
        console.log(carPaymentdetails);
        console.log('--------in cars---------');


        this.props.carPayment(carPaymentdetails);
    };

    componentWillMount()
    {
        //
        // API.getsession()
        //     .then((data) => {
        //         //console.log(data.user);
        //         if(data.user===undefined)
        //         {
        //             alert("User should be logined to make payment");
        //         }
        //         else
        //         {
        //
        //             this.props.history.push("/billing")
        //         }
        //     });
        //
        //
        //

if(this.props.carList.length==0)
{
 //alert("INVALID");
    this.props.history.push('/');
}

        var fromTime=new Date();
        this.setState({
            fromTime:fromTime
        });

        this.setState({
            carResults:this.props.carList,
            totalCarResults:this.props.carList
        });
      //  console.log(this.state.carResults);

    }
    // componentDidMount()
    // {
    //     this.setState({
    //         carResults:this.props.carsList,
    //     });
    //     console.log(this.state.carsList);
    // }



    componentWillUnmount()
    {
        var next = new Date();
        var data={};
        data.fromTime=this.state.fromTime.toString();
        data.toTime=next.toString();
        data.page='Cars Page';
            API.trackHotel(data)
                .then((data) => {
                    //console.log(data.user);
                    console.log("successfully tracked Cars");
                });

    }


    render() {
        return (
            <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
                <div className="row">
                    <CarSearchNavBar/>
                </div>
                <div className="d-flex p-2">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/car-map.png"/></div>
                            <div className="pt-2 pr-2"><CarOptions  filterOption={this.filterOption} TypeFilterOption={this.TypeFilterOption}/></div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2">
                                {
                                    this.state.emptyResults
                                        ?<EmptyResults />
                                       :<CarCard carList={this.state.carResults}  carPayment={this.carPayment}  filterPrice={this.state.filterPrice}/>
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/compare.png"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Cars);