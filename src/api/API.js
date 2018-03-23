const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });

export const makePayment = (payload) =>
    fetch(`${api}/makePayment`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //  console.log(res.status);
        return res.status;
    })
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });


export const Signup = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("SIGNUP - This is error");
        return error;
    });

export const getHotelDetails = (hotelPlace,hotelsDateTo,hotelsDateFrom,hotelsRooms,roomsType) =>
    fetch(`${api}/getHotelDetails?hotelPlace=`+hotelPlace+`&hotelsDateTo=`+hotelsDateTo+`&hotelsDateFrom=`+hotelsDateFrom+`
    &hotelsRooms=`+hotelsRooms+`&roomsType=`+roomsType+`
    `,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getUserDetails = (username,firstname,lastname,token) =>
    fetch(`${api}/getUserDetails?username=`+username+`&firstname=`+firstname+`&lastname=`+lastname+`&token=`+token+``,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getCardDetails = () =>
    fetch(`${api}/getCardDetails`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getUserProfile = () =>
    fetch(`${api}/getUserProfile`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getsession = () =>
    fetch(`${api}/getUser`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getAdminSession = () =>
    fetch(`${api}/getAdmin`,{credentials:'include'})
        .then(res => {
            return res.status;
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getPaymentDetails = (month,paymentdate) =>
    fetch(`${api}/getPaymentDetails?month=`+month+`&date=`+paymentdate+``,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getPaymentById = (paymentId) =>
    fetch(`${api}/getPaymentById?paymentId=`+paymentId+``,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getUserPayments = () =>
    fetch(`${api}/getUserPayments`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });




export const DeleteUser = () =>
    fetch(`${api}/DeleteUser`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        //res.data;
    })
        .catch(error => {
            console.log("DeleteUser - This is error");
            return error;
        });

export const AdminUserCheck = (payload) =>
    fetch(`${api}/AdminUserCheck`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const AdminUserDelete = (payload) =>
    fetch(`${api}/AdminUserDelete`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const UpdateUserInfo = (payload) =>
    fetch(`${api}/UpdateUserInfo`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const getImages = () =>
    fetch(`${api}/users`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/users/upload`, {
        method: 'POST',
        body: payload,
        credentials:'include',
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
    });

        export const carAvailabilityCheck = (payload) =>
    fetch(`${api}/carAvailabilityCheck`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const trackHotel = (payload) =>
    fetch(`${api}/trackHotel`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });






export const FlightAvailabilityCheck = (payload) =>
    fetch(`${api}/FlightAvailabilityCheck`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const carDetails = (place,dropoff,pickup) =>
    fetch(`${api}/carDetails?place=`+place+`&dropoff=`+dropoff+`&pickup=`+pickup+``,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const flightDetails = (placefrom,placeto,datefrom,dateto,adultCount,childCount,seniorsCount,flightCabin) =>
    fetch(`${api}/flightDetails?placefrom=`+placefrom+`&placeto=`+placeto+`&datefrom=`+datefrom+`&dateto=`+dateto+`&adultCount=`+adultCount+`&childCount=`+childCount+`&seniorsCount=`+seniorsCount+`&flightCabin=`+flightCabin+``,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const addAdmin = (payload) =>
    fetch(`${api}/addAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
        .catch(error => {
            console.log("addAdmin This is error");
            return error;
        });

export const addHotelListing = (payload) =>
    fetch(`${api}/addHotelListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
    //console.log(res);
    //{ return res.status;}
    //return res.status;
    //res.data;
    //})
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });

export const AddFlightListing = (payload) =>
    fetch(`${api}/AddFlightListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const AddCarListing = (payload) =>
    fetch(`${api}/AddCarListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const UpdateCarListing = (payload) =>
    fetch(`${api}/UpdateCarListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const UpdateFlightListing = (payload) =>
    fetch(`${api}/UpdateFlightListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const UpdateHotelListing = (payload) =>
    fetch(`${api}/UpdateHotelListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const hotelDetails = (payload) =>
    fetch(`${api}/hotelDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
    //console.log(res);
    //{ return res.status;}
    //return res.status;
    //res.data;
    //})
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });



export const welcome = () =>
    fetch(`${api}/welcome`, {
        method: 'POST',
        // headers: {
        //     ...headers,
        //     'Content-Type': 'application/json'
        // },
        credentials:'include',
        //body: JSON.stringify(payload)
    }).then(res => res.json())
    //console.log(res);
    //return res.status;
    //res.data;
    //})
        .catch(error => {
            console.log("welcome - This is error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("Sign Up - This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        //res.data;
    })
        .catch(error => {
            console.log("logout - This is error");
            return error;
        });
export const CheckListingIdExists = (payload) =>
    fetch(`${api}/CheckListingIdExists`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const GetListingDetails = (Type,ID) =>
    fetch(`${api}/GetListingDetails?Type=`+Type+`&ID=`+ID+``)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const GetPageStats = () =>
    fetch(`${api}/GetPageStats`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const TopFlightStats = () =>
    fetch(`${api}/TopFlightStats`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const TopHotelStats = () =>
    fetch(`${api}/TopHotelStats`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const TopCarStats = () =>
    fetch(`${api}/TopCarStats`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const BookingCountGraph = () =>
    fetch(`${api}/BookingCountGraph`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const RevenueGraph = () =>
    fetch(`${api}/RevenueGraph`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const CitywiseRevenue = () =>
    fetch(`${api}/CitywiseRevenue`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const UserTrackingGraph = (name) =>
    fetch(`${api}/UserTrackingGraph?username=`+name+``)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const AdminUserUpdate = (payload) =>
    fetch(`${api}/AdminUserUpdate`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getFuturePayments = () =>
    fetch(`${api}/getFuturePayments`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

