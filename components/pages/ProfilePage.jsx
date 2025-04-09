import {useEffect, useState} from "react";
import {getSteamUserInfo} from "../../external/steamApi.js";
import {Col, Row} from "react-bootstrap";

export default function ProfilePage({userDb}) {
    const [steamUserData, setSteamUserData] = useState({})

    useEffect(() => {
        let initSteamUserData = async () => {
            await getSteamUserInfo(userDb.username).then(userData => {
                setSteamUserData(userData);
                console.log(userData)
            });
        }
        initSteamUserData();
    }, [])

    return (
        <>
            <Row>
                <h4>Profilo di {steamUserData.userInfo?.personaname}</h4>
            </Row>
            <Row className="pt-4">
                <Col md={2}>
                    {/*<Image src={steamUserData.userInfo?.avatarfull} rounded={true}/>*/}
                </Col>
                <Col>

                </Col>
            </Row>
        </>

    )
}