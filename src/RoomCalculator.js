
import React from 'react';
import {Container, Card, Row, Col, Form, Alert} from 'react-bootstrap';

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
            message: "",
            inErrorState: false
        };

        // Wire up event handlers so they get the correct context of "this".
        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    setWidth(event) {
        let w = event.target.value;

        if(isNaN(w)) {
            this.setState({message:"Enter a numeric value.", inErrorState:true});
        } else {            
            this.setState({width: w, inErrorState:false, message:"OK"}, () => {this.recalc()});
        }   
    }

    setLength(event) {
        let l = event.target.value;

        if(isNaN(l)) {
            this.setState({message: "Enter a numeric value", inErrorState:true});
        } else {            
            this.setState({length: l, inErrorState:false, message:"OK"}, () => {this.recalc()});
        }
    }

    setHeight(event) {
        let h = event.target.value;

        if (isNaN(h)) {
            this.setState({message:"Enter a numeric value", inErrorState:true});
        } else {
            this.setState({height: h, inErrorState:false, message:"OK"}, () => {this.recalc()});
        }
    }

    recalc() {

        // Floor area.
        let fa = this.state.width * this.state.length;

        // Wall paint area.
        let wpa = (this.state.length * this.state.height * 2.0) + 
            (this.state.width * this.state.height * 2.0);

        // Room volume.
        let rv = this.state.width * this.state.length * this.state.height;

        this.setState({
            floorArea: fa,
            wallPaintArea: wpa,
            roomVolume: rv
        });
    }

    render() {

        let status;
        if(this.state.inErrorState) {
            status = <Alert variant='danger'>{this.state.message}</Alert>
        } else {
            status = <Alert variant='info'>{this.state.message}</Alert>
        }
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
                            <Col md={9}>{this.state.floorArea.toFixed(2)} m²</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Wall paint area:</Col>
                            <Col md={9}>{this.state.wallPaintArea.toFixed(2)} m²</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Room volume:</Col>
                            <Col md={9}>{this.state.roomVolume.toFixed(2)} m³</Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Row>
                    <Col md={12}>
                        {status}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RoomCalculator;