import {useEffect, useState} from "react";
import {getSteamUserInfo} from "../../external/steamApi.js";
import {Col, Row} from "react-bootstrap";
import {isObjectEmpty} from "../../src/util.js";
import "../../src/css/profilePage.css"
import LoadingComponent from "../LoadingComponent.jsx";

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
                        <Col md={2}>
                            {/*<Image src={steamUserData.userInfo.steamAvatar} rounded={true}/>*/}
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </>
            }
        </>

    )
}