import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {fullWhite} from 'material-ui/styles/colors';
import '../cssfiles/navbar.css';

class AdminListings extends Component {

    render() {
        return (
            <div className="container-fluid">
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >
                    <ul className="nav navbar-nav">
                            <li className="tabsFormat"> <a  href ="#">Hotels</a></li>
                            <li className="tabsFormat"> <a  href ="#">Flights</a></li>
                            <li className="tabsFormat"> <a  href ="#">Cars</a></li>
                            <li className="tabsFormat"><a href="#">Packages</a></li>
                            <li className="tabsFormat"> <a  href ="#">Rentals</a></li>
                            <li className="tabsFormat"> <a  href ="#">Cruises</a></li>
                    </ul>
                </div>
                </div>
            </nav>
            </div>
        );
    }
}

export default AdminListings;
