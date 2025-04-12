import {Alert} from "react-bootstrap";

export default function ErrorComponent() {
    return (<>
        <div className={"d-flex justify-content-center align-items-center"}>
            <Alert variant="custom">
                <p>Si è verificato un errore nel recupero dei dati, mangia un pezzo di torta e riprova più
                    tardi!</p>
                <br></br>
                <img src={"/cake.png"} alt="cake" className={"color-white"}
                     style={{width: "10%"}}/>
            </Alert>
        </div>
    </>)
}