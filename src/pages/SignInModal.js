import { useState} from "react";
import { Modal, Form, Col, Button, Alert } from "react-bootstrap";

export const SignInModal = ({ showModal, handleCloseModal }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [signinData, setSigninData] = useState({
        uid: "",
        password: "",
    });

    const handleInput = (e) => {
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCloseBtn = () => {
        handleCloseModal();
        setSigninData({
            userId: "",
            password: "",
        });
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        console.log("signinData = ", signinData);

        if (!signinData.uid || !signinData.password) {
            setShowAlert(true); // 에러 메시지를 표시
        } else {
            const response = await fetch("/user/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinData)
            })
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.access);
                setShowAlert(false); // 에러 메시지 감춤
                setSigninData({
                    uid: "",
                    password: "",
                });
                handleCloseModal();
                window.location.href = "/";

            } else {
                console.log("로그인 실패")
            }

        }
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
                                    placeholder="아이디를 입력해주세요."
                                    name="uid"
                                    value={signinData.uid}
                                    onChange={handleInput}
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
                                    value={signinData.password}
                                    onChange={handleInput}
                                />
                            </Col>
                        </Form.Group>

                        <Alert show={showAlert} variant="danger">
                            모든 필드를 입력하세요.
                        </Alert>

                        <div className="d-grid gap-1">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSignin}
                            >
                                Sign In
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
