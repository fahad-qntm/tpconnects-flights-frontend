import React, { Component } from 'react'
import './register-card.scss'
import { Formik } from 'formik'
import FormValidationSchemas from '../../../../Utils/FormValidationSchemas'
import RegisterForm from '../../../../Components/Forms/Register'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
const { RegisterYup } = FormValidationSchemas

export default class RegisterCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            role: '',
            confirm: '',
            showPassword: false,
            showConfirm: false
        }
    }

    _handleShowPassword = () =>
        this.setState({
            showPassword: !this.state.showPassword
        })

    _handleShowConfirm = () =>
        this.setState({
            showConfirm: !this.state.showConfirm
        })

    _closeBaseDialog = () => {
        this.props.resetDialog('base')
        if (!this.props.status.register.error)
            this.props.history.push('/dashboard')
    }

    _submitRegisterAccount = async (values, actions) => {
        await this.props.register(
            values.name,
            values.email,
            values.password,
            values.role
        )
    }

    render() {
        return (
            <Container maxWidth='md'>
                <Modal
                    show={this.props.dialogs.base.open}
                    onHide={this._closeBaseDialog}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.dialogs.base.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.dialogs.base.message}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='secondary'
                            onClick={this._closeBaseDialog}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className='register-card'>
                    <Row>
                        <Col xs={12}>
                            <h1>Register</h1>
                        </Col>
                    </Row>
                    <Row className='justify-content-md-center'>
                        <Col xs={12}>
                            <Card className='card-outer'>
                                <Card.Body className='card-inner'>
                                    <Formik
                                        validationSchema={RegisterYup}
                                        onSubmit={this._submitRegisterAccount}
                                        initialValues={{
                                            email: 'test@admin.com',
                                            password: 'test1234',
                                            role: 'Manager',
                                            name: 'Test'
                                        }}
                                        render={(props) => (
                                            <RegisterForm
                                                {...props}
                                                handleShowPassword={
                                                    this._handleShowPassword
                                                }
                                                showPassword={
                                                    this.state.showPassword
                                                }
                                                showConfirm={
                                                    this.state.showConfirm
                                                }
                                                handleShowConfirm={
                                                    this._handleShowConfirm
                                                }
                                            />
                                        )}
                                    />
                                    <Row className='justify-content-md-center'>
                                        <Col>
                                            <p className='go-to-login'>
                                                Already have an account?{' '}
                                                <a href='/login'>Login</a>
                                            </p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
