import {useState} from "react";
import {Modal, Form, Col, Button, Alert} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CryptoJs from "crypto-js"
import Swal from "sweetalert2";

export const SignInModal = ({ showModal, handleCloseModal }) => {

    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
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
        setValidated(false);
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (!signinData.uid || !signinData.password) {
            setValidated(true)
        } else {
            try {
                const response = await axios.post("/user/signin", JSON.stringify(signinData), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status === 200) {
                    const data = await response.data;
                    // JWT 토큰 암호화
                    const encryption = CryptoJs.AES.encrypt(data.access, process.env.REACT_APP_SECRET_KEY);
                    localStorage.setItem("token", encryption);
                    localStorage.setItem("loggedIn", true);
                    setSigninData({
                        uid: "",
                        password: "",
                    });
                    handleCloseModal();
                    setShowAlert(false);
                    Swal.fire({
                        title: "로그인이 완료되었습니다.",
                        text: "환영 합니다.",
                        icon: `success`,
                        confirmButtonText: "확인",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/";
                        } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                            window.location.href = "/";
                        }
                    })
                    navigate('/')
                } else {
                    console.log("로그인 실패")
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    setShowAlert(true);
                }
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
                    <Form noValidate validated={validated}>
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
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    아이디를 입력 해주세요.
                                </Form.Control.Feedback>
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
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Alert show={showAlert} variant="danger">
                            계정이 존재하지 않거나 비밀번호가 일치하지 않습니다.
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
