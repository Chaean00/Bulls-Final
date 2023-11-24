import {useContext, useEffect, useState} from "react";
import {Card, Container, ListGroup, Spinner, Row, Col, Modal, Form, Button} from "react-bootstrap";
import Person from "../images/person-circle.svg"
import "../styles/User.scss"
import LoginContext from "../context/LoginContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";

export const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [team, setTeam] = useState({});
    const {setLoggedIn, loggedIn} = useContext(LoginContext)
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
    useEffect(() => {
        if (!loggedIn) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }

        const getUserInfo = () => axios.get("/user/info",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        const getTeamInfo = () => axios.get("/team/info", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        Promise.all([getUserInfo(), getTeamInfo()])
            .then(([userResponse, teamResponse]) => {
                // 각 응답에 대한 처리
                if (userResponse.status === 200) {
                    setUser(userResponse.data);
                }
                if (teamResponse.status === 200) {
                    setTeam(teamResponse.data);
                }

                // 권한이 없는 경우
                if (userResponse.status === 401 || userResponse.status === 403 || teamResponse.status === 401 || teamResponse.status === 403) {
                    localStorage.removeItem("token")
                    setLoggedIn(false)
                    ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
                }
                setLoading(true);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const handleUpdate = async () => {
        const response = await axios.post("/user/updateintroduce", JSON.stringify(newIntroduce), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (response.status === 200) {
            ShowAlert("소개 수정 완료.", "감사합니다.", "success", "/user/info", navigate)
        } else {
            console.log(response.status);
        }

    }


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
                            <Card.Link href="#" onClick={openModal}>소개 수정</Card.Link>
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
                            <Card.Body>
                                <Card.Link href="#">팀 탈퇴</Card.Link>
                            </Card.Body>
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
        </Container>) : (
        <Container className="d-flex flex-column align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>);
}