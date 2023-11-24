import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/logo/bulls.png"
import Logo2 from "../images/logo/logo_transparent.png"
import "../styles/Header.scss";
import {useContext, useEffect, useState} from "react";
import SignUpModal from "../pages/SignUpModal";
import { SignInModal } from "../pages/SignInModal";
import LoginContext from "../context/LoginContext";
import Menu from "../images/menu.svg"
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const {loggedIn, setLoggedIn} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
        console.log(loggedIn);
    },[])

    const handleSignInOpenModal = () => {
        setShowSignInModal(true);
    };
    const handleSignInCloseModal = () => {
        setShowSignInModal(false);
    };
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        console.log("로그아웃");
        window.location.href = "/";
    }

    return (
        <Container className="header">
            <Navbar
                expand="lg"
                className="fixed-top navbar-custom"
                id="nav-bar"
            >
                <Container className="header_container">
                    <Navbar.Brand onClick={() => navigate("/")} style={{cursor:"pointer"}}>
                        <img src={Logo2} alt="로고" className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title={<img src={Menu} alt="Menu Icon" className="menu_icon"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/about')}>
                                    About
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/inquiry")}>
                                    문의하기
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => navigate("/teamregistration")}>
                                팀 등록
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/matchregistration")}>
                                매칭 등록
                            </Nav.Link>

                            {loggedIn ?
                                <Nav.Link onClick={logout}>
                                    로그아웃
                                </Nav.Link> : (
                                <>
                                    <Nav.Link onClick={handleSignInOpenModal}>
                                        로그인
                                    </Nav.Link>
                                    <Nav.Link onClick={handleOpenModal}>
                                        회원가입
                                    </Nav.Link>
                                </>
                                )
                            }
                            <SignInModal
                                showModal={showSignInModal}
                                handleCloseModal={handleSignInCloseModal}
                            />

                            <SignUpModal
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
                            />
                            <Nav.Link onClick={() => navigate("/user/info")}>
                                내정보
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Header;
