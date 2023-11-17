import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Person from "../images/person-circle.svg"

export const User = () => {
    const [user, setUser] = useState({});
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
                if (response.status === 401) {
                    console.log("401ERORR")
                }
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (!user) {
        return <div>
            로딩 중...
        </div>
    }

    return user ?
        <Container className="d-flex flex-column align-items-center">
            <p>내 정보</p>
            <img src={Person} alt={"사용자 로고"}/>
            <br/>
            <h6>{`유저 네임 = ${user.name}`}</h6>
            <br/>
            <h6>{`이메일 = ${user.email}`}</h6>
            <br/>
            <h6>{`닉네임 = ${user.nickname}`}</h6>
        </Container> :
        <Container>
            로딩 중....
        </Container>;
}