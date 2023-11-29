import {useEffect, useState} from "react";
import {Card, Container, ListGroup, Spinner, Row, Col, Modal, Form, Button} from "react-bootstrap";
import Person from "../images/person-circle.svg"
import Team from "../images/team_icon.png"
import "../styles/User.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";
import Swal from "sweetalert2";
import CryptoJs from "crypto-js";

export const User = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [user, setUser] = useState({});
    const [team, setTeam] = useState({});
    const [modal, setModal] = useState(false);
    const [newIntroduce, setNewIntroduce] = useState({
        uid: "",
        introduce: ""
    });
    const [loading, setLoading] = useState(false);

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    const handleIntroduceChange = (e) => {
        setNewIntroduce({
            ...newIntroduce,
            [e.target.name]: e.target.value
        });
    }
    // 유저 소개 업데이트
    const handleUpdate = async () => {
        setNewIntroduce({
            ...newIntroduce,
            uid: user.uid
        })
        const response = await axios.post("/user/updateintroduce", JSON.stringify(newIntroduce), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
            }
        })
        if (response.status === 200) {
            Swal.fire({
                title: "소개 수정 완료.",
                text: "감사합니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/user/info"
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    window.location.href = "/user/info"
                }
            })
        } else {
            console.log(response.status);
        }

    }
    const handleDeleteTeam = async () => {
        Swal.fire({
            title: "정말로 팀을 탈퇴하시겠습니까?",
            text: "다시 되돌릴 수 없습니다.",
            icon: "question",
            confirmButtonText: "확인",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "취소"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.get("/team/delete",{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
                    }
                })
                if (response.status === 200) {
                    Swal.fire({
                        title: "팀 탈퇴가 완료되었습니다.",
                        text: "감사합니다.",
                        icon: "success",
                        confirmButtonText: "확인",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/user/info";
                        } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                            window.location.href = "/user/info";
                        }
                    })
                } else {
                    console.log(response.status);
                }
            } else if (result.isDismissed) {
                navigate("/user/info");
            } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                navigate("/user/info");
            }
        })

    }
    useEffect(() => {
        if (!loggedIn) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }

        const getUserInfo = async () =>{
            try {
                const response = await axios.get("/user/info",{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
                    }
                })
                if (response.status === 200) {
                    setUser(response.data);
                    setNewIntroduce({
                        ...newIntroduce,
                        uid: response.data.uid
                    })
                    setLoading(true);
                    await getTeamInfo();
                }
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");
                console.log(error);
            }
        } ;

        const getTeamInfo = async () => {
            try {
                const response = await axios.get("/team/info", {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
                    }
                });
                if (response.status === 200) {
                    setTeam(response.data);
                } else {
                    setTeam(null);
                }
            } catch (error) {
                setTeam(null);
                console.log(error);
            }

        }
        getUserInfo();
    }, [])

    return loggedIn ? (loading ?
        <Container className="d-flex flex-column align-items-center" id="card_container">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card style={{ width: '18rem', margin: "auto" }} className="card">
                        <Card.Img variant="top" src={Person} className="card_img"/>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <br/>
                            <Card.Text>
                                {user.introduce}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{user.email}</ListGroup.Item>
                            <ListGroup.Item>{user.nickname}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link onClick={openModal} style={{cursor: "pointer"}}>소개 수정</Card.Link>
                        </Card.Body>
                        <Modal show={modal} onHide={closeModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>본인 소개 수정</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formPlaintextPassword"
                                    >
                                        <Col sm>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder="새로운 소개를 입력해주세요"
                                                name="introduce"
                                                value={newIntroduce.introduce}
                                                onChange={handleIntroduceChange}
                                                className="input_box"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Container className="d-flex justify-content-end">
                                <Button onClick={handleUpdate} className="save_button" size="sm">Save</Button>
                            </Container>
                        </Modal>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    {team !== null ? (
                        <Card style={{ width: '18rem', margin: "auto" }} className="card">
                            <Card.Img variant="top" src={Team} className="card_img"/>
                            <Card.Body>
                                <Card.Title>{team.teamName}</Card.Title>
                                <br/>
                                <Card.Text>
                                    {team.teamIntroduce}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{team.teamPhone}</ListGroup.Item>
                                <ListGroup.Item>{team.teamArea}</ListGroup.Item>
                                <ListGroup.Item>{team.teamCaptain}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link onClick={handleDeleteTeam} style={{cursor: "pointer"}}>팀 탈퇴</Card.Link>
                            </Card.Body>
                        </Card>) : (
                        <Card style={{ width: '18rem', margin: "auto" }} className="card">
                            <Card.Img variant="top" src={Person} className="card_img"/>
                            <Card.Body>
                                <Card.Title>팀 명</Card.Title>
                                <br/>
                                <Card.Text>
                                    팀 소개
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>팀 대표번호</ListGroup.Item>
                                <ListGroup.Item>팀 활동지역</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container> :
        // 로딩중일때
        <Container className="d-flex flex-column align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>)
        : (
        <Container className="d-flex flex-column align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>);
}