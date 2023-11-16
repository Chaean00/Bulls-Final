import { useState } from "react";
import {Modal, Button, Form, Col, Alert} from "react-bootstrap";

const SignUpModal = ({ showModal, handleCloseModal }) => {
    const [user, setUser] = useState({
        uid: "",
        password: "",
        email: "",
        name: "",
        nickname: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        console.log(confirmPassword);
    };

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log("회원가입완료");
        console.log("user = ", user);
        if (user.password !== confirmPassword) {
            console.log("비밀번호가 같지않음")
            setShowAlert(true) // 오류메세지 보여주기
            return;
        }

        try {
            const response = await fetch("/user/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                handleCloseModal();
            } else {
                console.error('ERROR = ', response.status);
            }
        } catch (error) {
            console.log("error", error)
        }

        setUser({
            userId: "",
            password: "",
            userName: "",
            email: "",
            nickName: "",
        });
        setConfirmPassword("");
    };

    const handleCloseBtn = () => {
        handleCloseModal();
        setUser({
            uid: "",
            password: "",
            email: "",
            name: "",
            nickname: "",
        });
        setConfirmPassword("");
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="아이디를 입력해주세요"
                                    name="uid"
                                    value={user.uid}
                                    onChange={handleInput}
                                    className="input_box"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInput}
                                    className="input_box"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="input_box"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInput}
                                    className="input_box"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col sm>
                                <Form.Control
                                    type="email"
                                    placeholder="이메일을 입력해주세요"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    className="input_box"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="닉네임을 입력해주세요"
                                    name="nickname"
                                    value={user.nickname}
                                    onChange={handleInput}
                                    className="input_box"
                                />
                            </Col>
                            <Alert show={showAlert} variant="danger">
                                비밀번호가 같지 않습니다.
                            </Alert>
                        </Form.Group>
                        <div className="d-grid gap-1">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSignUp}
                                className="input_box"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBtn}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignUpModal;
