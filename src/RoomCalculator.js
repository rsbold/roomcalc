
import React from 'react';
import {Container, Card, Row, Col, Form, Alert} from 'react-bootstrap';
import {NOT_NUMERIC_MSG, OK_MSG} from './Constants';

class RoomCalculator extends React.Component {
    // Room width, height, length are state set by user.
    // Floor area, wall area and volume are calculated state.
    // Assumes the room is a cuboid with no windows and doors.


    constructor(props) {
        
        // Not currently passing in any props.
        super(props);

        this.state = {
            length : 0.0,
            width : 0.0,
            height : 0.0,
            floorArea: 0.0,
            wallPaintArea: 0.0,
            includeCeiling: false,
            includeFloor: false,
            roomVolume: 0.0,
            message: "",
            inErrorState: false
        };

        // Wire up event handler so they get the correct context of "this".
        // Three individual handlers replaced by one common one, relies on 
        // the name property of the input controls being set correctly.
        this.setValue = this.setValue.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    setValue(event)
    {
        let name = event.target.name;
        let value = event.target.value;

        if(isNaN(value)) {
            this.setState({message:NOT_NUMERIC_MSG, inErrorState:true});
        } else {
            this.setState({[name]:value, inErrorState:false, message:OK_MSG}, () => {this.recalc()});
        }
    }

    checkboxChange(event) {
        let name = event.target.name;
        let checked = event.target.checked;
        
        this.setState({[name]:checked}, () => {this.recalc()});
    }

    recalc() {

        // Floor area.
        let fa = this.state.width * this.state.length;

        // Wall paint area.
        let wpa = (this.state.length * this.state.height * 2.0) + 
            (this.state.width * this.state.height * 2.0);

        // Allow for ceiling and floor area if they're to be included.
        if(this.state.includeCeiling) {
            wpa += fa;
        }

        if(this.state.includeFloor) {
            wpa += fa;
        }

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
                                <Form.Control name="length" type="text" value={this.state.length} onChange={this.setValue}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>Width (m)</Form.Label>
                            <Col md={9}>
                                <Form.Control name="width" type="text" value={this.state.width} onChange={this.setValue}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>Height (m)</Form.Label>
                            <Col md={9}>
                                <Form.Control name="height" type="text" value={this.state.height} onChange={this.setValue}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col md={3} />
                            <Col md={9}>
                                <Form.Check name="includeCeiling" label="Include ceiling" checked={this.state.includeCeiling} onChange={this.checkboxChange}></Form.Check>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col md={3} />
                            <Col md={9}>
                                <Form.Check name="includeFloor" label="Include floor" checked={this.state.includeFloor} onChange={this.checkboxChange}></Form.Check>
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