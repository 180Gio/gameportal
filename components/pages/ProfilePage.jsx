import {useEffect, useState} from "react";
import {getSteamUserInfo} from "../../external/steamApi.js";
import {Col, Row, Spinner} from "react-bootstrap";
import {isObjectEmpty} from "../../src/util.js";
import "../../src/css/profilePage.css"

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
                        <Row className={"d-flex justify-content-center"}>
                            <Col md={"4"} offset-md={"4"}
                                 className={"loading-holder d-flex align-items-center justify-content-center"}>
                                <Spinner animation="border" variant="info"/>&nbsp;&nbsp;Caricamento dati del profilo Steam
                            </Col>
                        </Row>
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