import {Badge} from "react-bootstrap";

export default function GamePriceDisplay({steamAppPrice, isFree}) {

    function hasDiscount() {
        return steamAppPrice.discount_percent > 0;
    }

    function getInitialPrice() {
        return steamAppPrice.initial_formatted;
    }

    function getFinalPrice() {
        return steamAppPrice.final_formatted;
    }

    function getDiscountPill() {
        return (
            <Badge pill bg={"success"}>-{steamAppPrice.discount_percent}%</Badge>
        )
    }

    return (
        <>
            <p><b>Prezzo su Steam:</b>&nbsp;
                {isFree ? <Badge pill bg={"success"}>Gratis</Badge> :
                    steamAppPrice ?
                        <> {hasDiscount() ? <s>{getInitialPrice()}</s> : null}
                            &nbsp;{getFinalPrice()}&nbsp;
                            {hasDiscount() ? getDiscountPill() : null}
                        </> :
                        <Badge pill bg={"info"}>Da annunciare</Badge>}
            </p>
        </>
    )
}