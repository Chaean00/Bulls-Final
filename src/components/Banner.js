import { Carousel } from "react-bootstrap";
import "../styles/Banner.scss";
import Banner1 from "../images/banner/football1.png";
import Banner2 from "../images/banner/football2.png";
import Banner3 from "../images/banner/football3.png";
import Banner4 from "../images/banner/football4.png";
import Banner5 from "../images/banner/football5.png";
import Banner6 from "../images/banner/football6.png";

export const Banner = () => {
    const Banners = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6];

    return (
        <Carousel className="slide" interval={4000}>
            {Banners.map((banner, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        id="slide_img"
                        src={banner}
                        alt={`${index + 1}번째 이미지`}
                    />
                    <Carousel.Caption>
                        <h4> 축구</h4>
                        <p>p태그 위치</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
