import {Container} from "react-bootstrap";
import React, {useEffect} from "react";
import "../styles/About.scss"
import AOS from "aos"
import 'aos/dist/aos.css'


export const About = () => {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Container>
            <div data-aos="fade-right" className="about_div_top">
                <p>김정택</p>
                <p>컴퓨터공학전공 / 석관중학교 졸업 / 경동고등학교 졸업</p>
                <p>jtkim965@naver.com</p>
                <p>111111</p>
            </div>
            <div data-aos="fade-left" className="about_div">
                <p>민나영</p>
                <p>컴퓨터공학전공 </p>
                <p>2222222@naver.com</p>
                <p>2222222</p>
            </div>
            <div data-aos="fade-right" className="about_div_bottom">
                <p>류희수</p>
                <p>컴퓨터공학전공 </p>
                <p>333333@naver.com</p>
                <p>333333</p>
            </div>
        </Container>
    )
};
