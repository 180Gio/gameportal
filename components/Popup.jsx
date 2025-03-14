import {Button, Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Popup({show, setShow, message, type}) {

    function getHeader() {
        switch (type) {
            case "success":
                return "Benvenuto!"
            case "error":
                return "Errore"
            case "warning":
                return "Attenzione!"
        }
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{getHeader()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary-orange" onClick={() => setShow(false)}>Chiudi</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}