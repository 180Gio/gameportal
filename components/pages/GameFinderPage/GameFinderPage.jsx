import {useEffect, useState} from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "/src/css/pages/gameFinder.css"
import GameSearch from "../../utilComponent/GameSearch.jsx";
import {isObjectEmpty} from "../../../src/util.js";
import LoadingComponent from "../../utilComponent/LoadingComponent.jsx";
import {Col, Container, Row} from "react-bootstrap";
import SteamAppInfo from "./SteamAppInfo.jsx";


export default function GameFinderPage({userDb}) {
    const [searchGame, setSearchGame] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [searchGame])

    return (
        <>
            <GameSearch setSearchGame={setSearchGame} setLoading={setLoading}/>
            {isObjectEmpty(searchGame) ?
                loading ? <LoadingComponent text={"Caricamento dei dati sul gioco"}/> :
                    <>
                        <Container>
                            <Row className={"d-flex justify-content-center align-items-center"}>
                                <Col className={"introduction"}>
                                    <p>Usa la barra di ricerca qui sopra per trovare informazioni sui tuoi giochi
                                        preferiti. La scienza dice che funziona. E noi ci fidiamo della
                                        scienza.</p>
                                </Col>
                            </Row>
                        </Container>
                    </> :
                <SteamAppInfo steamAppInfo={searchGame} email={userDb.email}/>
            }
        </>
    );
}