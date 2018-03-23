import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  checkbox: {
    marginBottom: 16,
  },
};
const color ={
  color:'#3C7EE2',
};
const tabBackground ={
  backgroundColor:fullWhite,
  color:fullWhite,
};
const muiTheme = getMuiTheme({
  palette: {
  primary1Color: '#3C7EE2',
  textColor: '#3C7EE2'
},
  });
class CarOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
        checked_SUV: true,
        checked_Large: true,
        checked_Small: true,
        checked_Medium: true,
        checked_Convertible: true,
        priceSlider: 0,
    };
  }
    updateCheck_SUV() {this.setState((oldState) => {return {checked_SUV: !oldState.checked_SUV,};});}
    updateCheck_Large() {this.setState((oldState) => {return {checked_Large: !oldState.checked_Large,};});}
    updateCheck_Small() {this.setState((oldState) => {return {checked_Small: !oldState.checked_Small,};});}
    updateCheck_Medium() {this.setState((oldState) => {return {checked_Medium: !oldState.checked_Medium,};});}
    updateCheck_Convertible() {this.setState((oldState) => {return {checked_Convertible: !oldState.checked_Convertible,};});}
    handleChangeTab = (value) => {this.setState({value: value,});};
    handleFirstSlider = (event, value) => {
        this.setState({priceSlider: value});
    };
    priceFilterSearch = () => {
           this.props.filterOption(this.state.priceSlider);
        };
    typeFilterSearch = () => {
        var filterOptions =[];
        if(this.state.checked_SUV){filterOptions.push("SUV");}
        if(this.state.checked_Large){filterOptions.push("Large");}
        if(this.state.checked_Small){filterOptions.push("Small");}
        if(this.state.checked_Medium){filterOptions.push("Medium");}
        if(this.state.checked_Convertible){filterOptions.push("Convertible");}

        this.props.TypeFilterOption(filterOptions);
    };
    resetCheckBox = () => {this.setState({
            checked_SUV: true,
            checked_Large: true,
            checked_Small: true,
            checked_Medium: true,
            checked_Convertible: true,
        },
        () => {this.typeFilterSearch()}
    );};
    resetPrice = () => {this.setState({priceSlider: 0},() => {this.props.filterOption(10000)});};
    render() {
        return (
            <div className="container-fluid p-2">
            <MuiThemeProvider muiTheme={muiTheme}>
              <Tabs inkBarStyle={{backgroundColor:"#3C7EE2"}}
              tabItemContainerStyle={tabBackground}
                value={this.state.value}
                onChange={this.handleChangeTab}>
                  <Tab  label={<span style={color} className='Text-bold'>TOP FILTERS</span>}
                  value="a" >
                    <div style={{backgroundColor: fullWhite}} >
                    <h3 style={styles.headline} className='Text-bold ml-2'>Car Type</h3><hr/>
                      <Checkbox className="ml-2" className='Text-bold'
                        label="SUV"
                                checked={this.state.checked_SUV}
                                onCheck={this.updateCheck_SUV.bind(this)}
                        style={styles.checkbox}
                      />
                      <Checkbox className="ml-2" className='Text-bold'
                        label="Large"
                                checked={this.state.checked_Large}
                                onCheck={this.updateCheck_Large.bind(this)}
                                style={styles.checkbox}
                      />
                        <Checkbox className="ml-2" className='Text-bold'
                                  label="Small"
                                  checked={this.state.checked_Small}
                                  onCheck={this.updateCheck_Small.bind(this)}
                                  style={styles.checkbox}
                        />
                        <Checkbox className="ml-2" className='Text-bold'
                                  label="Medium"
                                  checked={this.state.checked_Medium}
                                  onCheck={this.updateCheck_Medium.bind(this)}
                                  style={styles.checkbox}
                        />
                        <Checkbox className="ml-2" className='Text-bold'
                                  label="Convertible"
                                  checked={this.state.checked_Convertible}
                                  onCheck={this.updateCheck_Convertible.bind(this)}
                                  style={styles.checkbox}
                        />
                        <button className="btn ml-5 btn-link btn-primary" onClick={this.typeFilterSearch}>GO</button>
                        <button className="btn ml-5 btn-link btn-primary" onClick={this.resetCheckBox}>RESET</button>
                      <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Price</h3><hr/>
                        <div className="ml-2">${this.state.priceSlider}
                            <button className="btn ml-5 btn-link btn-primary" onClick={this.priceFilterSearch}>GO</button>
                            <button className="btn ml-5 btn-link btn-primary" onClick={this.resetPrice}>RESET</button>
                        <Slider min={0}  max={1000} step={1}
                        className="mr-2 ml-2 pb-5"
                        value={this.state.priceSlider}
                        onChange={this.handleFirstSlider} />
                      </div>
                    </div>
                  </Tab>
                  <Tab label={<span style={color} className='Text-bold'>More</span>}
                  value="b" >
                    <div>

                    </div>
                  </Tab>
              </Tabs>
            </MuiThemeProvider>
          </div>
        );
    }
}

export default CarOptions;
