import player1Img from "../assets/images/you.svg";
import player2Img from "../assets/images/cpu.svg";
import "./scoreCardStyles.css";

export default function ScoreCard({ playerNum, score }) {
    const className =
        "scoreCard" +
        (playerNum == 1 ? " scoreCard--player1" : " scoreCard--player2");

    const imgSrc = playerNum == 1 ? player1Img : player2Img;

    return (
        <div className={className}>
            <div className={"scoreCard__playerNum"}>Player {playerNum}</div>
            <div className={"scoreCard__score"}>{score}</div>
            <img className={"scoreCard__img"} src={imgSrc} alt="" />
        </div>
    );
}
