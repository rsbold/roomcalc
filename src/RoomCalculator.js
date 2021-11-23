
import React from 'react';
import {Container, Card, Row, Col, Form} from 'react-bootstrap';

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
            roomVolume: 1.0,
            message: ""
        };

        // Wire up event handlers so they get the correct context of "this".
        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    setWidth(event) {
        let w = event.target.value;

        if(isNaN(w)) {
            this.setState({message:"Enter a numeric value."});
        } else {
            let fa = this.floorArea(w, this.state.length);
            let wpa = this.wallPaintArea(w, this.state.length, this.state.height);
            let rv = this.roomVolume(w, this.state.length, this.state.height);
            
            this.setState({
                width: w,
                floorArea: fa,
                wallPaintArea: wpa,
                roomVolume: rv,
                message: "Calculated OK"
            });
        }   
    }

    setLength(event) {
        let l = event.target.value;

        if(isNaN(l)) {
            this.setState({message: "Enter a numeric value"});
        } else {
            let fa = this.floorArea(this.state.width, l);
            let wpa = this.wallPaintArea(this.state.width, l, this.state.height);
            let rv = this.roomVolume(this.state.width, l, this.state.height);
            
            this.setState({
                length: l,
                floorArea: fa,
                wallPaintArea: wpa,
                roomVolume: rv,
                message: "Calculated OK"
            });
        }
    }

    setHeight(event) {
        let h = event.target.value;

        if (isNaN(h)) {
            this.setState({message:"Enter a numeric value"});
        } else {

            // Height doesn't affect floor area, don't need to calculate.
            let wpa = this.wallPaintArea(this.state.width, this.state.length, h);
            let rv = this.roomVolume(this.state.width, this.state.length, h);

            this.setState({
                height: h,
                wallPaintArea: wpa,
                roomVolume: rv
            });
        }
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
            <Container>
                <h1>Room Calculator</h1>
                <Card>
                    <Card.Header>Room Dimensions</Card.Header>
                    <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>Length (m)</Form.Label>
                            <Col md={9}>
                                <Form.Control type="text" value={this.state.length} onChange={this.setLength}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>Width (m)</Form.Label>
                            <Col md={9}>
                                <Form.Control type="text" value={this.state.width} onChange={this.setWidth}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>Height (m)</Form.Label>
                            <Col md={9}>
                                <Form.Control type="text" value={this.state.height} onChange={this.setHeight}></Form.Control>
                            </Col>
                        </Form.Group>

                    </Form>
                </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        Calculations
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={3}>Floor area:</Col>
                            <Col md={9}>{this.state.floorArea} m²</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Wall paint area:</Col>
                            <Col md={9}>{this.state.wallPaintArea} m²</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Room volume:</Col>
                            <Col md={9}>{this.state.roomVolume} m³</Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Row>
                    <Col md={12}>
                        {this.state.message}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RoomCalculator;