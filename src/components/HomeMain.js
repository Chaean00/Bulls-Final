import { Container, Image, Row, Col } from "react-bootstrap";
import "../styles/HomeMain.scss";
import Ball1 from "../images/ball1.png";
import Ball2 from "../images/ball2.png";
import Ball3 from "../images/ball3.png";

export const HomeMain = () => {
    return (
        <>
            <Container className="d-flex flex-column align-items-center">
                <br />
                <p>축구 하고싶은 당신! 상대 팀을 못구하고있다면?</p>
                <h2>
                    Bulls FootBall을 통해
                    <br /> 상대 팀을 구해보세요.
                </h2>
                <br />
                <p>이제 망설일 필요가 없습니다.</p>
            </Container>
            <Container>
                <Row className="justify-content-center">
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball1}
                            style={{ width: "200px", height: "200px" }}
                        ></Image>
                        <div>규칙 1</div>
                    </Col>
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball2}
                            style={{ width: "200px", height: "200px" }}
                        ></Image>
                        <div>규칙 2</div>
                    </Col>
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball3}
                            style={{ width: "200px", height: "200px" }}
                        ></Image>
                        <div>규칙 3</div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
