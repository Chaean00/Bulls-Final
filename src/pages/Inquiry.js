import {Container, Form,  Button} from "react-bootstrap";
import {useState} from "react";
import "../styles/Inquiry.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";

export const Inquiry = () => {
    const navigate = useNavigate();
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
        try {
            const response = await axios.post("/inquiry/new", JSON.stringify(inquiry), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                ShowAlert("문의 완료", "문의 해주셔서 감사합니다", "success", "/", navigate)
                setInquiry({
                    title: "",
                    name: "",
                    phone: "",
                    email: "",
                    body: ""
                })
                console.log("ok = " + response.status)
            } if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("token")
                localStorage.removeItem("loggedIn")
                ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            } else {
                console.log(response.status)
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("loggedIn")
                ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            }
            console.log("Error = " + error)
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
            <Button variant="primary" type="submit" onClick={handleInquiry} className="inquiry_btn">
                문의하기
            </Button>
        </Form>
    </Container>);
};
