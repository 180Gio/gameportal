import {Badge, Col, Row} from "react-bootstrap";
import GamePriceDisplay from "./GamePriceDisplay.jsx";
import {useEffect, useState} from "react";
import {getSteamAppInfoFromId} from "../../../external/steamApi.js";

export default function GameDLCDisplay({dlcAppId}) {
    const [dlcInfo, setDlcInfo] = useState({});

    useEffect(() => {
        getDLCInfo(dlcAppId);
    }, [dlcAppId]);

    function getDLCInfo(dlcAppId) {
        getSteamAppInfoFromId(dlcAppId).then((steamAppInfo) => {
            if (steamAppInfo.success) {
                setDlcInfo(steamAppInfo.data);
            }
        });
    }

    function getTypeBadge(type) {
        let typeBadge;
        let text;
        switch (type) {
            case 'music':
                typeBadge = "danger"
                text = "Musica"
                break;
            case 'dlc':
                typeBadge = "info"
                text = "DLC"
                break;
            default:
                typeBadge = "dark"
                text = type?.toUpperCase();
        }
        return (<Badge bg={typeBadge}>{text}</Badge>)
    }

    return (
        <>
            <Row>
                <Col md={6}>
                    {dlcInfo.name}
                </Col>
                <Col md={2}>
                    {getTypeBadge(dlcInfo.type)}
                </Col>
                <Col>
                    <GamePriceDisplay isFree={dlcInfo.is_free} steamAppPrice={dlcInfo.price_overview}/>
                </Col>
            </Row>
        </>
    )
}