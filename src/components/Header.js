import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/logo/Bulls-removebg.png";
import "../styles/Header.scss";
import { useState } from "react";
import SignUpModal from "../pages/SignUpModal";
import { SignInModal } from "../pages/SignInModal";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

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

    // const [isTop, setIsTop] = useState(true);

    // useEffect(() => {
    //     const checkScroll = () => {
    //         setIsTop(window.scrollY < 50); // 50px 이하에서는 isTop을 true로 설정
    //     };

    //     // 스크롤 이벤트에 checkScroll 함수를 바인딩
    //     window.addEventListener("scroll", checkScroll);

    //     // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    //     return () => {
    //         window.removeEventListener("scroll", checkScroll);
    //     };
    // }, []);

    return (
        <Container className="header">
            {/* <Navbar expand="lg" className="fixed-top"> */}
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
                            <Nav.Link onClick={handleSignInOpenModal}>
                                로그인
                            </Nav.Link>
                            <SignInModal
                                showModal={showSignInModal}
                                handleCloseModal={handleSignInCloseModal}
                            />
                            <Nav.Link onClick={handleOpenModal}>
                                회원가입
                            </Nav.Link>
                            <SignUpModal
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Header;
