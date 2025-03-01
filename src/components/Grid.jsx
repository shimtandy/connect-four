import gridFront from "../assets/images/grid-front-layer.svg";
import gridBack from "../assets/images/grid-back-layer.svg";
import "./gridStyles.css";

export default function Grid({ gridStatus, width, height }) {
    function handleGridClick(event) {
        console.log("Grid clicked");
    }

    return (
        <div className="grid" onClick={handleGridClick}>
            <img className="grid__backImg" src={gridBack} alt="" />
            <div className="grid__diskContainer"></div>

            <img
                className="grid__frontImg"
                src={gridFront}
                alt=""
                draggable="false"
            />
        </div>
    );
}
