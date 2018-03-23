import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AdminUsers from "./AdminUsers";
import AdminStats from "./AdminStats";
import AdminT from "./AdminT";
import AdminBills from "./AdminBills";
import AdminHome from "./AdminHome";
import ErrorBoundary from "./ErrorBoundary";
import AdminProfile from "./AdminProfile";
import AdminListingsMain from "./AdminListingsMain";
import * as API from '../api/API';
import BarChartData from "./TopFlightStats";
import Menu from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite,red300} from 'material-ui/styles/colors';
class Admin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        isStatsPage:false,
        isListingPage:false,
        isUsersPage:false,
        isBillsPage:false,
        isHomePage:true,
        isAdminProfilePage:false,
         hasError: false
      };
    }
handleToggle = () => this.setState({open: !this.state.open});


  componentWillMount()
  {
      API.getAdminSession()
          .then((data) => {

              if(data!=200)
              {
                  this.props.history.push("/");
              }

          });

  }



 handleStatsPage = () => this.setState({
   open: false,
   isStatsPage:true,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:false,
   isAdminProfilePage:false,
 });
 handleListings = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:true,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:false,
   isAdminProfilePage:false,
 });
 handleUsers = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:true,
   isBillsPage:false,
   isHomePage:false,
   isAdminProfilePage:false,
 });
 handleBills = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:true,
   isHomePage:false,
   isAdminProfilePage:false,
 });
 handleHome = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:true,
   isAdminProfilePage:false,
 });

 handleAdminProfile = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:false,
   isAdminProfilePage:true,
 });
    handleLogout = () => {
        console.log("Handle log out");
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });

    };

 addAdmin = (AdminToAdd) => {
   this.props.addAdmin(AdminToAdd);
 }
 componentDidCatch() {
     this.setState({
       hasError: true
     });
     console.log("error");
   }
    render() {
      if(this.state.hasError) {
      return (<h4>ERROR</h4>);
    }
        return (
          <div>
          <div className="row mr-5 col-md-10 justify-content-md-start">
          <Menu
            onClick={this.handleToggle}
            viewBox="0 0 20 20"
          />
          <Drawer
            docked={false}
            zDepth={4}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onClick={this.handleStatsPage}>Stats Page</MenuItem>
            <MenuItem onClick={this.handleListings}>Manage Listings</MenuItem>
            <MenuItem onClick={this.handleUsers}>Manage Users</MenuItem>
            <MenuItem onClick={this.handleBills}>Search Payment info</MenuItem>
            <MenuItem onClick={this.handleAdminProfile}>Admin Profile</MenuItem>
            <MenuItem onClick={this.handleHome}>Home</MenuItem>
            <MenuItem onClick={this.handleHome}>
                <RaisedButton className="mt-4"
                label = "Log out"
                labelColor ={red300}
                backgroundColor={fullWhite}
                onClick={this.handleLogout}
                />
            </MenuItem>
          </Drawer>
          </div>
          <div className="row justify-content-md-center">
          {
            this.state.isStatsPage
            ?<ErrorBoundary><AdminT/></ErrorBoundary>
            :null
          }
          </div>
          <div className="row ml-5 mt-5 col-md-10 justify-content-md-center">

          {
            this.state.isListingPage
            ?<AdminListingsMain />
            :null
          }
          {
            this.state.isHomePage
            ?<AdminHome addAdmin={this.addAdmin}/>
            :null
          }
          {
            this.state.isBillsPage
            ?<AdminBills />
            :null
          }
          {
            this.state.isUsersPage
            ?<AdminUsers />
            :null
          }
          {
            this.state.isAdminProfilePage
            ?<AdminProfile />
            :null
          }
          </div>
      </div>
        );
    }
}

export default withRouter(Admin);
