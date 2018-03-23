import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import BillingMain from "./BillingMain";
import '../cssfiles/carcard.css';
const cardStyle = {
    display: 'block',
    width: '60vw',
    height: '16vw',
};
class AdminListings extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //carResults :[]
            // {'carPrice':'455','CarType':'Economy','doors':'4','people':'4','bags':'2','Img':'/images/car.png','carPlace':'OAK'},
            // {'carPrice':'333','CarType':'SUV','doors':'6','people':'8','bags':'2','Img':'/images/suv.png','carPlace':'SFO'},
            // {'carPrice':'678','CarType':'SUV','doors':'4','people':'8','bags':'4','Img':'/images/suv.png','carPlace':'SFO'},
            // {'carPrice':'455','CarType':'compact','doors':'2','people':'2','bags':'2','Img':'/images/car1.png','carPlace':'MAA'}],
            //
        };
    }

    CarPayment=(id,price,Company)=> {
       // alert(id);
        // this.props.history.push(<BillingMain/>);
        var carDetails={};
        carDetails.id=id;
        carDetails.price=price;
        carDetails.Company=Company;
        this.props.carPayment(carDetails);
    };


    componentWillMount()
    {
        // console.log(this.props.carList);
        // console.log(this.state.carResults);
        // this.setState({
        //     carResults:this.props.carList
        // });
        // console.log(this.state.carResults);

    }

    render() {
        let people=<svg className="people" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#717585"></path></svg>;
        let bag=<svg className="bags" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 6.16h-3.2V4.58c0-.88-.71-1.58-1.6-1.58H8.4c-.89 0-1.6.7-1.6 1.58v1.58H3.6c-.89 0-1.6.7-1.6 1.58v8.68C2 17.3 2.71 18 3.6 18h12.8c.89 0 1.6-.7 1.6-1.58V7.74c0-.88-.71-1.58-1.6-1.58zm-4.8 0H8.4V4.58h3.2v1.58z" fill="#717585"></path></svg>;
        let door=<svg className="doors" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.38 2h-5.7C8.03 2 7.26 3.6 7.26 3.6L4 7.6v8.8c0 .88.73 1.6 1.63 1.6h9.75c.89 0 1.62-.72 1.62-1.6V3.6c0-.89-.73-1.6-1.63-1.6zm0 5.6H6.44l3.25-4h5.69v4zM7.24 10h3.25v1.6H7.25V10z" fill="#717585"></path></svg>;
        let flight=<svg className="flightscaricon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.36 18a.2.2 0 0 1-.15-.12l-3.07-7.27-3.52 3.52-.13 2.86-.45.81c-.02.02-.32-.11-.34-.11-.04-.03.1-.1.1-.1L5.69 14.8 2.6 13.34a.07.07 0 0 1-.04-.05c0-.02 0-.04.02-.06l.57-.57 2.72-.28L9.4 8.86 2.12 5.8a.2.2 0 0 1-.06-.33l.86-.86a.2.2 0 0 1 .16-.06l9.34 1.3 3.37-3.36c.4-.4 1.4-.74 1.93-.2.53.53.2 1.54-.19 1.94L14.15 7.6l1.31 9.32a.2.2 0 0 1-.06.16l-.86.86a.2.2 0 0 1-.18.06z" fill="#717585"></path></svg>;
        return (
            <div className="car-container">
                {
                    this.props.carList.map((car, index) => (

                        <div className="car-card row">

                            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 first">

                                {
                                    [6].map(function (index1) {
                                        if(index==0)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OQAMBT0ByXJ14lXgnglcHt_0rbv9G_qYUKUQWAhD0Y0hOTad" />
                                        else if(index % index1==1)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxUvs9Z0nVyjRMnyUiy5K7q2wv2QUByUyYxx2_GXdaJYuQvppG" />
                                        else if(index % index1==2)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRER2fSXhn4d2ZdchdDuOOn3LdITYqHwGVlL3fq1SEQAhwvIwHC" />
                                        else if(index % index1==3)
                                            return <img className="picture" src="data:image/jpeg;base64,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" />
                                        else if(index % index1==4)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoBFOl829hrl8cA6Tt0Q25mh1xqfAQS_90NkAahshJ7W-r4-YwQA" />
                                        else if(index % index1==5)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2xpgvnqELUoDRjcOXTHA5rmjV_EScpK7hD9edGNgZu_0jZITAg" />
                                        else if(index % index1==0)
                                            return <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-8_pG4XFjrIGz10649TS80eYyY4fEL-rWiRjc5lQtdgvkjiwhA" />

                                    })
                                }


                            </div>


                            <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5 carmiddle">
                                <div className="row titlerow">
                                    <div className="col-md-12 cartitle">
                                        <span className="cardTitle">{car.carType}</span>
                                    </div>
                                </div>

                                <div className="row carsecondrow">
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 carsecond">
                                        <span>{people}</span><span className="noofpeople">{car.peopleCount.substr(0,1)}</span>
                                        <span>{bag}</span><span className="noofbags">{car.bagCount.substr(0,1)}</span>
                                        <span>{door}</span><span className="noofdoors">{car.doorCount.substr(0,1)}</span>
                                    </div>
                                </div>

                                <div className="row carthirdrow">
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                        <span>{flight}</span><span className='shuttlecity'> {car.carPlace} Shuttle</span>
                                    </div>
                                </div>

                                <div className="row fourthrow">
                                    <span className='greatdeal'>GREAT DEAL</span>
                                </div>
                            </div>


                            <div className="col-lg-3 col-sm-3 col-md-3 col-xs-3 last">
                                <span id="carcost">${car.carPrice}</span>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <button className="carbookdealbutton"    onClick={() => this.CarPayment(car.id,car.carPrice,car.Company)}           >Book Deal</button>

                                    </div>
                                </div>

                            </div>


                        </div>

                    ))
                }
            </div>
        );
    }
}
export default AdminListings;
{/*}<Card style={cardStyle}>
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-column bg-info">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column bg-info">
            <h3>car</h3>
          </div>
          <div className="d-flex align-items-end flex-column bg-info">
            <div className="pt-2 pr-2">
              <img src="/images/car.png"/>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-end flex-column bg-primary border-left">
        <vr/>
        <div className="pt-2 pr-2 ">
            <RaisedButton label="View Deal" className="ml-5"/>
        </div>
      </div>
    </div>
</Card>*/}