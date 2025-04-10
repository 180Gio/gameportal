import {useEffect, useState} from "react";
import {getSteamUserInfo} from "../../external/steamApi.js";
import {Col, Image, Row} from "react-bootstrap";
import {isObjectEmpty} from "../../src/util.js";
import "../../src/css/profilePage.css"
import LoadingComponent from "../LoadingComponent.jsx";
import GameDisplay from "../GameDisplay.jsx";

export default function ProfilePage({userDb}) {
    const [steamUserData, setSteamUserData] = useState({})

    useEffect(() => {
        let initSteamUserData = async () => {
            await getSteamUserInfo(userDb.username).then(userData => {
                setSteamUserData(userData);
            });
        }
        initSteamUserData();
    }, [])

    return (
        <>
            {isObjectEmpty(steamUserData) ? (
                    <>
                        <LoadingComponent text={"Caricamento dati del profilo Steam"}/>
                    </>
                ) :
                <>
                    <Row>
                        <h4>Profilo di {steamUserData.userInfo.steamUsername}</h4>
                    </Row>
                    <Row className="pt-4">
                        <Col md={3}>
                            <Image src={steamUserData.userInfo.steamAvatarUrl} thumbnail={true}/>
                        </Col>
                        <Col md={9}>
                            <Row className={"pb-3"}>
                                <h3>Giochi recenti</h3>
                            </Row>
                            <Row className={"d-flex"}>
                                {steamUserData.recentlyPlayedGames.map((game, idx) => (
                                    <GameDisplay game={game} idx={idx}/>
                                ))}
                            </Row>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </>
            }
        </>

    )
}