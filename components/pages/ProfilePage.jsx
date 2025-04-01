import {useEffect, useState} from "react";
import {getSteamUserInfo} from "../../external/steamApi.js";
import {Col, Image, Row} from "react-bootstrap";

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
                <h4>Profilo di {steamUserData.username}</h4>
            </Row>
            <Row className="pt-4">
                <Col md={2}>
                    <Image src={steamUserData.profilePictureUrl} rounded={true}/>
                </Col>
                <Col>

                </Col>
            </Row>
        </>

    )
}