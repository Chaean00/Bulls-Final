import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";
import {LoadingSpinner} from "../components/LoadingSpinner";

export const MatchRegistration = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("token");
            localStorage.removeItem("loggedIn")
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
    }, [])
    return loggedIn ? (
        <div>매칭 등록 페이지</div>
        ) :
        (
            <LoadingSpinner/>
        );
};
