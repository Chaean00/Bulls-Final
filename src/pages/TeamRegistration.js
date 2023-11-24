import {useContext, useEffect, useState} from "react";
import LoginContext from "../context/LoginContext";
import {Button, Container, Form, Spinner} from "react-bootstrap";
import "../styles/TeamRegistration.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";

export const TeamRegistration = () => {
    const navigate = useNavigate();
    const {loggedIn} = useContext(LoginContext)
    const [team, setTeam] = useState({
        teamName: "",
        teamCaptain: "",
        teamIntroduce: "",
        teamPhone: "",
        teamArea: "",
    })

    useEffect(() => {
        if (!loggedIn) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
    })

    const handleChange = (e) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value
        })

    }

    const handleTeam = async (e) => {
        e.preventDefault()
        const response = await axios.post("/team/new", JSON.stringify(team), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        if (response.status === 200) {
            ShowAlert("팀 등록이 완료되었습니다.", "환영합니다.", "success", "/", navigate)
        } if (response.status === 401 || response.status === 403) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else {
            console.log("ERROR = " + response.status);
        }

    }

    return loggedIn ? (
        <Container className="team_container">
            <Form>
                <h3 className="team_text">팀 등록하기</h3>
                <Container>
                    <Form.Group className="team_group" controlId="team_input1">
                        <Form.Label>팀 명</Form.Label>
                        <Form.Control type="textarea" placeholder="팀 명" name="teamName"
                                      value={team.teamName}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input2">
                        <Form.Label className="team_label">주장 성함</Form.Label>
                        <Form.Control type="textarea" placeholder="주장 성함" name="teamCaptain"
                                      value={team.teamCaptain}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input3">
                        <Form.Label className="team_label">팀 소개</Form.Label>
                        <Form.Control type="textarea" placeholder="팀 소개" name="teamIntroduce"
                                      value={team.teamIntroduce}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input4">
                        <Form.Label className="team_label">대표 연락처</Form.Label>
                        <Form.Control type="textarea" placeholder="대표 연락처" name="teamPhone"
                                      value={team.teamPhone}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input5">
                        <Form.Label className="team_label">활동 지역</Form.Label>
                        <Form.Control type="textarea" placeholder="활동 지역" name="teamArea"
                                      value={team.teamArea}
                                      onChange={handleChange}/>
                        <br/>
                        <Button variant="primary" type="submit" onClick={handleTeam} className="team_btn">
                            팀 등록하기
                        </Button>
                    </Form.Group>

                </Container>
            </Form>
        </Container>) : (
        <Container className="d-flex flex-column align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
};
