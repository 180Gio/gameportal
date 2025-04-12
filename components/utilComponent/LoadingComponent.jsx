import {Col, Row, Spinner} from "react-bootstrap";
import "/src/css/utilComponents/loadingComponent.css"

export default function LoadingComponent({text}) {
    return (
        <Row className={"d-flex justify-content-center"}>
            <Col md={"4"} offset-md={"4"}
                 className={"loading-holder d-flex align-items-center justify-content-center"}>
                <Spinner animation="border" variant="info"/>&nbsp;&nbsp;{text}
            </Col>
        </Row>
    )
}