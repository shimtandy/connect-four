import gridFront from "../assets/images/grid-front-layer.svg";
import gridBack from "../assets/images/grid-back-layer.svg";
import "./gridStyles.css";

export default function Grid({ clickHandler, children }) {
    return (
        <div className="grid" onClick={clickHandler}>
            <img className="grid__backImg" src={gridBack} alt="" />
            <div className="grid__diskContainer">{children}</div>
            <img
                className="grid__frontImg"
                src={gridFront}
                alt=""
                draggable="false"
            />
        </div>
    );
}
