import {useContext, useState} from "react";
import { Modal, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import LoginContext from "../context/LoginContext";
import {useNavigate} from "react-router-dom";

export const SignInModal = ({ showModal, handleCloseModal }) => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [signinData, setSigninData] = useState({
        uid: "",
        password: "",
    });
    const {setLoggedIn, loggedIn} = useContext(LoginContext)

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
            const response = await axios.post("/user/signin", JSON.stringify(signinData), {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 200) {
                const data = await response.data;
                localStorage.setItem("token", data.access);
                setShowAlert(false); // 에러 메시지 감춤
                setSigninData({
                    uid: "",
                    password: "",
                });
                setLoggedIn(true);
                console.log(loggedIn)
                handleCloseModal();
                navigate('/')

            } else {
                console.log("로그인 실패")
            }

        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
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
                                로그인
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
