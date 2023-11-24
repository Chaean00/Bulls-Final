import {Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "../styles/About.scss"
import AOS from "aos"
import 'aos/dist/aos.css'
import {KakaoMap} from "../components/KakaoMap";
import Mysql_Logo from "../images/skills_logo/mysql_icon.png"
import Spring_Logo from "../images/skills_logo/spring_icon.png"
import React_Logo from "../images/skills_logo/react_icon.png"
import Rds_Logo from "../images/skills_logo/rds_icon.png"


export const About = () => {
    const [selectedImage, setSelectedImage] = useState("");

    const handleMouseEnter = (e) => {
        setSelectedImage(e.target.alt);
    };

    const handleMouseLeave = () => {
        setSelectedImage("");
    };

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Container>
            <Container className="aboutUs_div">
                <h1 className="aboutUs_text">About Us</h1>
            </Container>
            <Container>
                <h2 className="we_used_text">We used</h2>
            </Container>
            <Container className="skills_container">
                <img src={Mysql_Logo} alt="Mysql Logo" className={`mysql_logo ${selectedImage === "Mysql Logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
                <img src={Spring_Logo} alt="Spring logo" className={`spring_logo ${selectedImage === "Spring logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
                <img src={React_Logo} alt="React logo" className={`react_logo ${selectedImage === "React logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
                <img src={Rds_Logo} alt="Rds logo" className={`rds_logo ${selectedImage === "Rds logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}/>
            </Container>
            <Container className="introduce_container">
                <div className="role" data-aos="fade-right">
                    <p>Front | Design</p>
                </div>
                <Container data-aos="fade-right" className="about_div_top">
                    <p>민나영</p>
                    <p>대진대학교 3학년 컴퓨터공학전공</p>
                    <p>20212149@daejin.ac.kr</p>
                    <p>20212149</p>
                </Container>
            </Container>

            <Container className="introduce_container">
                <div className="role" data-aos="fade-left">
                    <p>Front | Back | Design</p>
                </div>
                <Container data-aos="fade-left" className="about_div">
                    <p>김정택</p>
                    <p>대진대학교 3학년 컴퓨터공학전공</p>
                    <p>jtkim965@naver.com</p>
                    <p>20191479</p>
                </Container>
                <div className="role" data-aos="fade-right">
                    <p>Front | Back</p>
                </div>
            </Container>
            <Container className="introduce_container">
                <Container data-aos="fade-right" className="about_div_bottom">
                    <p>류희수</p>
                    <p>대진대학교 3학년 컴퓨터공학전공 </p>
                    <p>hs201016@naver.comm</p>
                    <p>20191303</p>
                </Container>
                <Container className="kakao_map">
                    <h4>We Work in</h4>
                    <KakaoMap/>
                </Container>
            </Container>
        </Container>
    )
};
