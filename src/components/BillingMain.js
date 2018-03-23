import React, {Component} from 'react';
import BillingNavBar from "./BillingNavBar";
import { Route, withRouter } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500,deepOrange300,fullWhite} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as API from '../api/API';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CardForm } from 'react-payment';
import {getUserDetails} from "../api/API";
const styles = {
    customWidth: {
        width: 120,
    },
};
const muiTheme = getMuiTheme({
    flatButton: {
        primaryTextColor: deepOrange500,
    },
    datePicker: {
        selectColor: deepOrange500,
        headerColor: deepOrange500,
    },
    timePicker: {
        selectColor: deepOrange500,
        headerColor: deepOrange500,
    },
    palette: {
        accent1Color: deepOrange500,
        selectedTextColor: fullWhite,
        canvasColor: fullWhite
    }
});
class BillingMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:null,
            lastname:null,
            phoneNumber:null,
            email:null,
            streetAddress:null,
            city:null,
            state:null,
            nameOnCard:null,
            cardNumber:null,
            expDate:null,
            cvc:null,
            Zip:null,
            userDetails: null,
            clickOnce:0,
            open: false,
            summary:null,
            alertEmpty:false,
            fromTime:''
        };
    }

    componentWillMount(){
        //API call - to get user values and card details

        var userResult = {
            nameOnCard:'',
            cardNumber:'',
            expDate:'',
            cvc:'',
            zip:'',
        };

        var fromTime=new Date();
        this.setState({
            fromTime:fromTime
        });


        API.getCardDetails()
            .then((result) => {

                console.log(result);
                this.setState({
                    cardNumber: result[0].creditcard,
                    nameOnCard:result[0].firstname
                });

                var userResult = {
                    nameOnCard:this.state.firstname,
                    cardNumber:this.state.cardNumber,
                    expDate:'',
                    cvc:'',
                    zip:'',
                };

                this.setState({userDetails:userResult});
                console.log(this.state.cardNumber);
                console.log('--------------');
            });



        this.setState({userDetails:userResult,clickOnce :0});
        //Summary --

        console.log('-----------------');
        console.log(this.props.payment);
        console.log('-----------------');
        var price='';
        if(this.props.payment.category=='hotel') {
            var from=new Date(this.props.payment.hotelsDateFrom);
            var to=new Date(this.props.payment.hotelsDateTo);
            var fmonth=from.getMonth()+1;
            var tomonth=to.getMonth()+1;
            if(fmonth<10)
            {
                fmonth='0'+fmonth;
            }
            if(tomonth<10)
            {
                tomonth='0'+tomonth;
            }
            var fdate=from.getDate();
            if(from.getDate()<10)
            {
                fdate='0'+fdate;
            }
            var todate=to.getDate();
            if(to.getDate()<10)
            {
                todate='0'+todate;
            }
            var fromDate=from.getFullYear()+'-'+fmonth+'-'+fdate;
            var toDate=to.getFullYear()+'-'+tomonth+'-'+todate;

            from=new Date(fromDate);
            to=new Date(toDate);
            var timeDiff1 = Math.abs(to.getTime() - from.getTime());
            var diffDay = Math.ceil(timeDiff1 / (1000 * 3600 * 24));
            console.log("------------date DIFF in hotels");
            console.log(diffDay);
            console.log("------------date DIFF in hotels");
            if (diffDay > 0)
                price = diffDay * this.props.payment.price * this.props.payment.hotelsRoomsCount;
            else
                price = this.props.payment.price * this.props.payment.hotelsRoomsCount;

        }
        else if(this.props.payment.category=='car')
        {

            var datepickup=new Date(this.props.payment.carsDatePickUp);
            var datedropoff=new Date(this.props.payment.carsDateDropOff);
            var timeDiff = Math.abs(datedropoff.getTime() - datepickup.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log(diffDays);
            if(diffDays > 0) {
                price = diffDays * this.props.payment.price;
            }
            else
                price=this.props.payment.price;

        }

        else if(this.props.payment.category=='flight')
        {

            price=this.props.payment.price*this.props.payment.count;
        }

        var summary = {
            category:this.props.payment.category,
            ItemID:this.props.payment.id,
            totalPrice:price,
        };
        this.setState(
            {summary : summary}
        );
    }

    // submitPayment = () => {
    //     alert("inside in billing");
    //     console.log(this.props.payment);
    //     API.makePayment(this.props.payment)
    //         .then((result) => {
    //             // console.log(result);
    //             if(result==201)
    //                 alert("Successfully Payment done");
    //             else
    //                 alert("not done");
    //         });
    //     //console.log(this.state.userdata);
    //     console.log("payment Details: "+this.state);
    // };
    handleOpen = () => {this.setState({open: true});};
    handleHome = () => {
        this.setState({open: false});
        this.props.history.push("/");
    };
    handleBooking = () => {
        this.setState({open: false});

        this.props.history.push("/UserProfile");
    };



    componentWillUnmount()
    {
        var next = new Date();
        var data={};
        data.fromTime=this.state.fromTime.toString();
        data.toTime=next.toString();
        data.page='Payment Page';

            API.trackHotel(data)
                .then((data) => {
                    //console.log(data.user);
                    console.log("successfully tracked Hotel");
                });

    }













    onSubmit= (card) => {

        //For valid credit cards - for testing purposes and zipcode values - refer to
        //https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm
        // Test Card that will work - 378282246310005/4111111111111111/6011000990139424
        if(this.state.clickOnce == 0){
            if(this.state.firstname == null || this.state.lastname == null ||
                this.state.phoneNumber == null || this.state.email == null ||
                this.state.streetAddress == null || this.state.city == null ||
                this.state.state == null){
                this.setState({alertEmpty : true});
            }
            else{

                this.props.payment.cardDetails=this.state.cardNumber;
                API.makePayment(this.props.payment)
                    .then((result) => {
                        // console.log(result);
                        if(result==201)
                            console.log("Successfully Payment done");

                        else
                            console.log("not done");
                    });
                this.setState({alertEmpty : false});
                const { number, exp_month, exp_year, cvc, name, zip } = card;
                console.log("Submitted" + name + number + exp_month + exp_year + cvc + name + zip );
                //If details are same - no changes to user Details
                //If the user changes the details - update the databse with new card number/user details
                this.handleOpen();
            }
        }
        else{
            console.log("only twice.");
        }

    };


    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleBooking}
            />,
            <FlatButton
                label="NO"
                primary={true}
                onClick={this.handleHome}
            />,
        ];
        return (
            <div className="container-fluid">
                <div className="row">
                    <BillingNavBar/>
                </div>
                <div className="row p-4">
                </div>
                <div className="row">
                    <div className="col-lg-3 justify-content-start ml-3" style={{backgroundColor:'#E9ECEF',height: '100vh'}}>
                        <div className="justify-content-start Text-big Text-bold pt-3"><h5>Billing Details</h5>
                        </div> <hr/>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="First Name"
                                       onChange={(event) => {this.setState({firstname: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name"
                                       onChange={(event) => {this.setState({lastname: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Phone Number"
                                       onChange={(event) => {this.setState({phoneNumber: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email"
                                       onChange={(event) => {this.setState({email: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Street Address"
                                       onChange={(event) => {this.setState({streetAddress: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="City"
                                       onChange={(event) => {this.setState({city: event.target.value});}} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="State"
                                       onChange={(event) => {this.setState({state: event.target.value});}} required/>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label pl-1">
                                    <input type="checkbox" className="form-check-input pr-1 pl-1"/>
                                    This order is tax exempt
                                </label>
                            </div>
                            {
                                this.state.alertEmpty
                                    ?<div className="alert alert-danger" role="alert">Please Fill All the Details</div>
                                    :null
                            }
                        </form>
                    </div>
                    <div className="col-lg-4 justify-content-start ml-5" style={{backgroundColor:'#E9ECEF',height: '100vh'}}>
                        <div className="justify-content-start Text-big Text-bold pt-3"><h5>Payment Method</h5>
                        </div> <hr/>
                        <form>
                            <div className="form-group">
                                <img src='/images/payment.png'/>
                            </div>
                            <div className="form-group">
                                <MuiThemeProvider muiTheme={muiTheme}>
                                    <CardForm
                                        label="Make Payment"
                                        onSubmit={this.onSubmit}
                                        getName={true}
                                        getZip={true}
                                        defaultValues={{name: this.state.userDetails.nameOnCard,
                                            number: this.state.userDetails.cardNumber,
                                            expiration: this.state.userDetails.expDate,
                                            cvc: this.state.userDetails.cvc,
                                            zip: this.state.userDetails.zip,
                                        }}
                                    />
                                </MuiThemeProvider>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 justify-content-start ml-5 pt-3 " style={{backgroundColor:'#E9ECEF',height: '100vh'}}>
                        <div className="justify-content-start Text-big Text-bold"><h5>Purchase Summary</h5>
                            <div className="card text-left pt-3 mt-5 pb-5">
                                <div className="card-body">
                                    <h4 className="card-title">Booking Type : {this.state.summary.category}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">ID :{this.state.summary.ItemID}</h6>
                                    <p className="card-text">Total Amount : {this.state.summary.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div><hr/>
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Payment Successful. Would you like to view the Booking?
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withRouter(BillingMain);