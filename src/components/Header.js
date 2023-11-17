import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/logo/Bulls-removebg.png";
import "../styles/Header.scss";
import {useContext, useEffect, useState} from "react";
import SignUpModal from "../pages/SignUpModal";
import { SignInModal } from "../pages/SignInModal";
import LoginContext from "../context/LoginContext";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const {loggedIn, setLoggedIn} = useContext(LoginContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
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


    console.log("login = " + loggedIn);



    return (
        <Container className="header">
            <Navbar
                expand="lg"
                className="fixed-top navbar-custom"
                id="nav-bar"
            >
                <Container>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="로고" className="logo" />
                        Bulls
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav className="ml-auto">
                            <NavDropdown title="Drop" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about">
                                    About
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/inquiry">
                                    문의하기
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/teamregistration">
                                팀 등록
                            </Nav.Link>
                            <Nav.Link href="/matchregistration">
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
                            <Nav.Link href="/user/info">
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
