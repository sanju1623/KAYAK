import React, {Component} from 'react';
import './App.css';

// import HomePage from "./components/HomePage";
// import NewHomePage from "./components/NewHomePage";

import {BrowserRouter} from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
                <div className="App">
                    <BrowserRouter>
                    <MuiThemeProvider>
                        <LandingPage/>
                        </MuiThemeProvider>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
