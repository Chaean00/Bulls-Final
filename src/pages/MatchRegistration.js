import {useContext, useEffect} from "react";
import LoginContext from "../context/LoginContext";
import {Container, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";

export const MatchRegistration = () => {
    const navigate = useNavigate();
    const {loggedIn} = useContext(LoginContext)


    useEffect(() => {
        if (!loggedIn) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
    })
    return loggedIn ? (
        <div>매칭 등록 페이지</div>
        ) :
        (
            <Container className="d-flex flex-column align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
};
