import {useContext, useEffect, useState} from "react";
import LoginContext from "../context/LoginContext";
import {Button, Container, Form} from "react-bootstrap";
import Swal from "sweetalert2";

export const TeamRegistration = () => {
    const {setLoggedIn} = useContext(LoginContext)
    const [team, setTeam] = useState({
        teamName: "",
        teamCaptain: "",
        teamIntroduce: "",
        teamPhone: "",
        teamArea: "",
    })

    const handleChange = (e) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value
        })

    }

    const handleTeam = async (e) => {
        e.preventDefault()
        console.log(team)
        const response = await fetch("/team/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(team)
        })
        if (response.ok) {
            console.log("팀 등록 완료")
            window.location.href = "/";
        } if (response.status === 401 || response.status === 403) {
            // Swal.fire({
            //     title: "로그인 시간이 만료되었습니다.",
            //     text: "다시 로그인해주세요",
            //     icon: "error",
            //
            // }).then(() => {
            //     window.location.href = "/"
            // })
            console.log("401? 403 = " + response.status);
        } else {
            console.log("ERROR = " + response.status);
        }

    }

    return (
        <Container className="inquiry_container">
            <Form>
                <h3 className="inquiry_text">팀 등록하기</h3>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>팀 명</Form.Label>
                    <Form.Control type="textarea" placeholder="팀 명" name="teamName"
                                  value={team.teamName}
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>주장 성함</Form.Label>
                    <Form.Control type="textarea" placeholder="주장 성함" name="teamCaptain"
                                  value={team.teamCaptain}
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>팀 소개</Form.Label>
                    <Form.Control type="textarea" placeholder="팀 소개" name="teamIntroduce"
                                  value={team.teamIntroduce}
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>대표 연락처</Form.Label>
                    <Form.Control type="textarea" placeholder="대표 연락처" name="teamPhone"
                                  value={team.teamPhone}
                                  onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>활동 지역</Form.Label>
                    <Form.Control type="textarea" placeholder="활동 지역" name="teamArea"
                                  value={team.teamArea}
                                  onChange={handleChange}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit" onClick={handleTeam}>
                    팀 등록하기
                </Button>
            </Form>
        </Container>);
};
