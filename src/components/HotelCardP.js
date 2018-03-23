import React, {Component} from 'react';
import '../cssfiles/hotelcard.css';
import * as API from '../api/API';

class HotelCardP extends Component {
    constructor(){
        super();
        this.state={
            rating:4,
            fromTime:'',
        };

    }

    componentWillMount()
    {
        console.log(this.props.hotelResults);
        var fromTime=new Date();
        this.setState({
            fromTime:fromTime
        });

    }

    HotelPayment=(id,price,name,City) =>
    {
        var hotelDetails={};
        hotelDetails.id=id;
        hotelDetails.price=price;
        hotelDetails.name=name;
        hotelDetails.City=City;
        alert("in hotel");
        this.props.HotelPayment(hotelDetails);

    };


    //
    //
    // componentWillUnmount()
    // {
    //     var next = new Date();
    //     var data={};
    //     data.fromTime=this.state.fromTime.toString();
    //     data.toTime=next.toString();
    //     data.page='Hotels Page';
    //     API.trackHotel(data)
    //         .then((data) => {
    //             //console.log(data.user);
    //             console.log("successfully tracked hotels");
    //         });
    //
    // }







    render() {
        let starRating = [];
        return (
            <div className="hotel-container">
                {
                    this.props.hotelResults.map((hotel, index) => (
                        <div className="hotel-card row">
                            <div className="col-lg-4 col-sm-12 col-md-4 col-xs-12 first">
                                {
                                    [6].map(function (index1) {
                                        if(index==0)
                                            return <img src="https://media-cdn.tripadvisor.com/media/photo-s/08/20/75/0d/hotel-contessa.jpg" className="picture"/>
                                        else if(index % index1==1)
                                            return <img src="https://www.oiaaa.org/wp-content/uploads/2013/09/hilton-easton.jpg" className="picture"/>
                                        else if(index % index1==2)
                                            return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHQpSuivtsmZBAKhHhvWzCZWL-8lVsOCivAP2LTsqVg-sidnhCA" className="picture"/>
                                        else if(index % index1==3)
                                            return <img src="https://media.timeout.com/images/102532742/image.jpg" className="picture"/>
                                        else if(index % index1==4)
                                            return <img src="http://cdn.cnn.com/cnnnext/dam/assets/171109145517-06-cozy-hotels-redefining-luxury-full-169.jpg" className="picture"/>
                                        else if(index % index1==5)
                                            return <img src="http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/spain/canary-islands/tenerife/iberostar-grand-hotel-mirador-tenerife-l-xlarge.jpg" className="picture"/>
                                        else if(index % index1==0)
                                            return <img src="http://parklanenewyork.com/sites/default/files/styles/masthead_1200x562/public/PL-Park-Lane-Suite-Living-Room-Oct2015_5.jpg?itok=lc6AjJ0s" className="picture"/>

                                    })
                                }
                            </div>
                            <div className="col-lg-5 col-sm-6 col-md-6 col-xs-6 middle">
                                <span className="cardTitle"><strong>{hotel.Name}</strong></span>

                                <div className="col-lg-12 star">
                                    {
                                        [1, 2, 3, 4, 5].map(function(index3) {
                                            if(index3 <= parseInt(hotel.Ratings))
                                                return index3 <= parseInt(hotel.Ratings) ?
                                                    <span className="fa fa-star" key={index3}>

                                            </span>: '';
                                        }.bind(this))
                                    }
                                </div>

                                <div className="row secondrow">
                                    
                                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 insidemiddle">

                                        <div id="review">{hotel.Reviews}</div>

                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6 insidelast">
                                        <div>Location</div>
                                        <div>{hotel.Address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12 col-md-2 col-xs-12 last">
                                <span id="cost">$ {hotel.price}</span>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12">
                                        <button className="viewdealbutton"
                                                onClick={() => this.HotelPayment(hotel.hotelId,hotel.price,hotel.Name,hotel.City)}
                                        >Book Deal</button>
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
export default HotelCardP;
