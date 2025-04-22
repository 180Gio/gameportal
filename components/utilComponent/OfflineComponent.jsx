import "/src/css/utilComponents/offlineComponent.css"
import {Container, Row} from "react-bootstrap";

export default function OfflineComponent() {
    return (
        <>
            <Container className={"offline-container p-4"}>
                <Row className={"offline-row"}>
                    <h1> CONNESSIONE PERSA</h1>
                </Row>
                <Row className={"offline-row"}>
                    <p className={"offline-text"}>
                        "È stato un grande successo. Lo sto annotando qui: **successo enorme**… ma la tua connessione,
                        purtroppo, no."
                    </p>
                </Row>
                <Row className={"offline-row"}>
                    <p className={"offline-hint"}>
                        La tua connessione... è scomparsa.<br/>
                        Ripristina la rete oppure rimani intrappolato in questa camera di test.
                    </p>
                </Row>
                <Row className={"offline-row"}>
                    <button className={"offline-button"} onClick={() => window.location.reload()}>
                        Riprova la connessione
                    </button>
                </Row>
            </Container>
        </>
    )
}