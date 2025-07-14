import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

function Register() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center auth-background vh-100">
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow p-4">
                <h2 className="text-center mb-4">הרשמה</h2>

                <Form>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>שם מלא</Form.Label>
                        <Form.Control type="text" placeholder="הזן את שמך המלא" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control type="email" placeholder="הזן אימייל" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="הזן סיסמה" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formConfirmPassword">
                        <Form.Label>אימות סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="הזן שוב את הסיסמה" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        הרשם
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <small>כבר יש לך חשבון? <a href="/login">התחבר כאן</a></small>
                </div>
            </Card>
        </Container>
    );
}

export default Register;
