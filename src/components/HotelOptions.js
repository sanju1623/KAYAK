import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
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
const stylesR = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
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
class HotelOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
            checked: false,
            firstSlider: 0,
        };
    }
    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
        console.log(this.state.firstSlider);
    };
    priceFilterSearch = () => {this.props.priceFilter(this.state.firstSlider);};
    resetPriceSlider = () =>
    {
        this.setState({
            firstSlider:0
        });
        this.props.priceFilter(3000);

    };
    updateCheck() {this.setState((oldState) => {return {checked: !oldState.checked,};});}
    handleChangeTab = (value) => {this.setState({value: value,});};
    ChangeRadio = (event,value) => {this.setState({valueD: value})};
    starFilterSearch = () => {
        this.props.starFilter(this.state.valueD);};
    resetStarFilter = () => {
        this.props.starFilter('0');
        this.setState({valueD: '0'});
    };
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
                                <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Stars</h3><hr/>
                                <div className="form-inline">
                                    <RadioButtonGroup name="shipSpeed"
                                                      valueSelected={this.state.valueD}
                                                      onChange={this.ChangeRadio}>
                                        <RadioButton
                                            value='1'
                                            label="1Star"
                                            checkedIcon={<Star/>}
                                            uncheckedIcon={<StarBorder/>}/>
                                        <RadioButton
                                            value='2'
                                            label="2Stars"
                                            checkedIcon={<Star/>}
                                            uncheckedIcon={<StarBorder/>}
                                            style={styles.radioButton}
                                        />
                                        <RadioButton
                                            value='3'
                                            label="3Stars"
                                            checkedIcon={<Star/>}
                                            uncheckedIcon={<StarBorder/>}
                                            style={styles.radioButton}
                                        />
                                        <RadioButton
                                            value='4'
                                            label="4Stars"
                                            checkedIcon={<Star/>}
                                            uncheckedIcon={<StarBorder/>}
                                            style={styles.radioButton}
                                        />
                                        <RadioButton
                                            value='5'
                                            label="5Stars"
                                            checkedIcon={<Star/>}
                                            uncheckedIcon={<StarBorder/>}
                                            style={styles.radioButton}
                                        />
                                    </RadioButtonGroup>
                                    {console.log("valueD: "+this.state.valueD)}
                                </div>
                                <button className="btn ml-5 btn-link btn-primary" onClick={this.starFilterSearch}>GO</button>
                                <button className="btn ml-5 btn-link btn-primary" onClick={this.resetStarFilter}>RESET</button>
                                <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Price</h3><hr/>
                                <div className="ml-2">${this.state.firstSlider}
                                    <Slider min={0}  max={1000} step={1}
                                            className="mr-2 ml-2 pb-5"
                                            value={this.state.firstSlider}
                                            onChange={this.handleFirstSlider} />
                                </div>
                                <button className="btn ml-5 btn-link btn-primary" onClick={this.priceFilterSearch}>GO</button>
                                <button className="btn ml-5 btn-link btn-primary" onClick={this.resetPriceSlider}>RESET</button>
                            </div>

                        </Tab>
                        <Tab label={<span style={color} className='Text-bold'>More</span>}
                             value="b" >
                            <div style={{backgroundColor: fullWhite}}>
                                <h3 style={styles.headline} className='Text-bold ml-2'>Freebies</h3><hr/>
                                <Checkbox className="ml-2" className='Text-bold'
                                          label="Free Breakfast"
                                          checked={this.state.checked}
                                          onCheck={this.updateCheck.bind(this)}
                                          style={styles.checkbox}
                                />
                                <Checkbox className="ml-2" className='Text-bold'
                                          label="Free Parking"
                                          checked={this.state.checked}
                                          onCheck={this.updateCheck.bind(this)}
                                          style={styles.checkbox}
                                />

                            </div>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default HotelOptions;
