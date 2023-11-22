import {Container, Form,  Button} from "react-bootstrap";
import {useContext, useState} from "react";
import "../styles/Inquiry.scss"
import LoginContext from "../context/LoginContext";
import Swal from "sweetalert2";

export const Inquiry = () => {
    const {setLoggedIn} = useContext(LoginContext)
    const [inquiry, setInquiry] = useState({
        title: "",
        name: "",
        phone: "",
        email: "",
        body: ""
    })
    const handleChange = (e) => {
        setInquiry({
            ...inquiry,
            [e.target.name]: e.target.value
        })

    }
    const handleInquiry = async (e) => {
        e.preventDefault()
        console.log(inquiry)
        try {
            const response = await fetch("/inquiry/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(inquiry)
            })
            if (response.ok) {
                Swal.fire({
                    title: "문의 완료",
                    text: "문의 해주셔서 감사합니다",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/"
                })
                setInquiry({
                    title: "",
                    name: "",
                    phone: "",
                    email: "",
                    body: ""
                })
            } if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("token")
                setLoggedIn(false)
                Swal.fire({
                    title: "로그인 시간이 만료되었습니다.",
                    text: "다시 로그인해주세요",
                    icon: "error",
                }).then(() => {
                    window.location.href = "/"
                })
            } else {
                console.log(response.status)
            }
        } catch (error) {
            console.log("ERROR = " + error)
        }

    }

    return (
    <Container className="inquiry_container">
        <Form>
            <h3 className="inquiry_text">Contact Us</h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>제목</Form.Label>
                <Form.Control type="textarea" placeholder="제목" name="title"
                              value={inquiry.title}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>이름</Form.Label>
                <Form.Control type="textarea" placeholder="이름" name="name"
                              value={inquiry.name}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>연락처</Form.Label>
                <Form.Control type="textarea" placeholder="연락처"
                              name="phone"
                              value={inquiry.phone}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일" name="email"
                              value={inquiry.email}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>문의 내용</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="문의 내용" name="body"
                              value={inquiry.body}
                              onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleInquiry}>
                문의하기
            </Button>
        </Form>
    </Container>);
};
