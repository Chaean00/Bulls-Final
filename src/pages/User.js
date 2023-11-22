import {useContext, useEffect, useState} from "react";
import {Card, Container, ListGroup, Spinner, Row, Col, Modal, Form, Button} from "react-bootstrap";
import Person from "../images/person-circle.svg"
import "../styles/User.scss"
import LoginContext from "../context/LoginContext";
import Swal from "sweetalert2";

export const User = () => {
    const [user, setUser] = useState({});
    const [team, setTeam] = useState({});
    const {setLoggedIn} = useContext(LoginContext)
    const [modal, setModal] = useState(false);
    const [newIntroduce, setNewIntroduce] = useState({
        uid: "",
        introduce: ""
    });

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    const handleIntroduceChange = (e) => {
        setNewIntroduce({
            ...newIntroduce,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        fetch('/user/info', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("token")
                    setLoggedIn(false)
                    Swal.fire({
                        title: "로그인 시간이 만료되었습니다.",
                        text: "다시 로그인해주세요",
                        icon: "error",
                    }).then(() => {
                        window.location.href = "/"
                    })
                }
            })
            .then(data => {
                setNewIntroduce({
                    ...newIntroduce,
                    uid: data.uid
                })
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            })

        fetch('/team/info', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("token")
                setLoggedIn(false)
                Swal.fire({
                    title: "로그인 시간이 만료되었습니다.",
                    text: "다시 로그인해주세요",
                    icon: "error",
                }).then(() => {
                    window.location.href = "/"
                })
            }
        }).then(data => {
                setTeam(data);
            })
            .catch(error => {
                console.log(error);
            })

    }, [])


    const handleUpdate = async () => {

        console.log(newIntroduce)

        const response = await fetch("/user/updateintroduce", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newIntroduce)
        })
        if (response.ok) {
            console.log("본인 소개 수정 완료");
            window.location.href = "/user/info";
        } else {
            console.log(response.status);
        }

    }


    return user ?
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
                            <Card.Link href="#" onClick={openModal}>소개 수정</Card.Link>
                        </Card.Body>
                        <Modal show={modal} onHide={closeModal}>
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
                    {team ? (
                        <Card style={{ width: '18rem', margin: "auto" }} className="card">
                            <Card.Img variant="top" src={Person} className="card_img"/>
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
                            </ListGroup>
                        </Card>) : (
                        <Card style={{ width: '18rem', margin: "auto" }} className="card">
                            <Card.Img variant="top" src={Person} className="card_name"/>
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
        </Container>;
}