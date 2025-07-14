import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

function Login() {
    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow p-4">
                <h2 className="text-center mb-4">התחברות</h2>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control type="email" placeholder="הזן אימייל" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="הזן סיסמה" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        התחבר
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <small>אין לך חשבון? <a href="/register">להרשמה</a></small>
                </div>
            </Card>
        </Container>
    );
}

export default Login;
