import './Home.scss'
import Figure from 'react-bootstrap/Figure'
import { Col, Row } from 'react-bootstrap'

export const Home = () => {
    return (
         <Figure>
            <Row className="justify-content-md-center">
            <Col xs={34} sm={34} md={14}>
            <Figure.Image
                    width={1800}
                    alt="cinema"
                    src="https://www.linguahouse.com/linguafiles/md5/c1a891a2958ae7c85915f28d4aaa3da1"
                />
            </Col></Row>
            <Row className="justify-content-md-center">
            <Col xs={12} sm={4} md={4}>
                <Figure.Caption>
                Welcome to our cinema.
                </Figure.Caption>
                </Col></Row>
                </Figure>

    )
}

export default Home;
