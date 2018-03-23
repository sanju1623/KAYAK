import React, {Component} from 'react';
import MyAccountHome from "./MyAccountHome";
import { Route, withRouter } from 'react-router-dom';
import {fullWhite} from 'material-ui/styles/colors';
class SearchNavBar extends Component {
  toHome = () => {this.props.history.push("/")};
    render() {
        return (
          <div className="container-fluid">

            <div className="row justify-content-center" >
                <div className="col-md-6">
                  <div className="justify-content-center">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                      <a className="navbar-brand" href="#"></a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav Text-bold Text-big">
                          <button className="nav-item pr-4 nav-link btn-link Text-white Text-big btn" onClick={this.toHome}>Hotels</button>
                          <button className="nav-item pr-4 nav-link btn-link  Text-big btn" onClick={this.toHome}>Flights</button>
                          <button className="nav-item pr-4 nav-link btn-link  Text-big btn " onClick={this.toHome}>cars</button>
                          <button className="nav-item pr-4 nav-link btn-link  Text-big  btn" onClick={this.toHome}>Packages</button>
                          <button className="nav-item pr-4 nav-link btn-link  Text-big btn" onClick={this.toHome}>Rentals</button>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
            </div>

            <Route exact path="/"/>
          </div>
        );
    }
}

export default withRouter(SearchNavBar);
