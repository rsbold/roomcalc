
import React from 'react';
import ReactDOM from 'react-dom';

class RoomCalculator extends React.Component {
    // Room width, height, length are state set by user.
    // Floor area, wall area and volume are calculated state.
    // Assumes the room is a cuboid with no windows and doors.

    constructor(props) {
        
        // Not currently passing in any props.
        super(props);

        this.state = {
            length : 1.0,
            width : 1.0,
            height : 1.0,
            floorArea: 1.0,
            wallPaintArea: 1.0,
            roomVolume: 1.0
        };

        // Wire up event handlers so they get the correct context of "this".
        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    setWidth(event) {
        let w = event.target.value;
        
        let fa = this.floorArea(w, this.state.length);
        let wpa = this.wallPaintArea(w, this.state.length, this.state.height);
        let rv = this.roomVolume(w, this.state.length, this.state.height);
        
        this.setState({
            width: w,
            floorArea: fa,
            wallPaintArea: wpa,
            roomVolume: rv
        });
    }

    setLength(event) {
        let l = event.target.value;
        
        let fa = this.floorArea(this.state.width, l);
        let wpa = this.wallPaintArea(this.state.width, l, this.state.height);
        let rv = this.roomVolume(this.state.width, l, this.state.height);
        
        this.setState({
            length: l,
            floorArea: fa,
            wallPaintArea: wpa,
            roomVolume: rv
        });
    }

    setHeight(event) {
        let h = event.target.value;

        // Height doesn't affect floor area, don't need to calculate.
        let wpa = this.wallPaintArea(this.state.width, this.state.length, h);
        let rv = this.roomVolume(this.state.width, this.state.length, h);

        this.setState({
            height: h,
            wallPaintArea: wpa,
            roomVolume: rv
        });
    }

    floorArea(width, length) {
        return width * length;
    }

    wallPaintArea(width, length, height) {
        return (length * height * 2) +
            (width * height * 2);
    }

    roomVolume(width, length, height) {
        return width * length * height;
    }

    render() {
        return(
            <div>
                <h1>Room Dimensions</h1>
                <p>Length (m): <input type="text" value={this.state.length} onChange = {this.setLength}></input></p>
                <p>Width (m): <input type="text" value={this.state.width} onChange = {this.setWidth}></input></p>
                <p>Height (m): <input type="text" value={this.state.height} onChange = {this.setHeight}></input></p>

                <h1>Calculations</h1>
                <p>Floor area: {this.state.floorArea} m²</p>
                <p>Wall paint area: {this.state.wallPaintArea} m²</p>
                <p>Room volume: {this.state.roomVolume} m²</p>


            </div>
        )
    }
}

export default RoomCalculator;