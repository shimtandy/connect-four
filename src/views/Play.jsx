import styles from "./play.module.css";
import logo from "../assets/images/logo.svg";
import player1 from "../assets/images/you.svg";
import player2 from "../assets/images/cpu.svg";
import gridFront from "../assets/images/grid-front-layer.svg";
import gridBack from "../assets/images/grid-back-layer.svg";
import { useRef, useEffect, useState } from "react";
import Disk from "../components/Disk";
import PlayerIndicator from "../components/PlayerIndicator";
import Modal from "react-modal";
import { Link } from "react-router";

export default function Play() {
    const TIME_PER_TURN = 20;
    const GRID_WIDTH = 7;
    const GRID_HEIGHT = 6;

    let [timeLeft, setTimeLeft] = useState(TIME_PER_TURN);
    let [player1Score, setPlayer1Score] = useState(0);
    let [player2Score, setPlayer2Score] = useState(0);
    let [currentTurn, setCurrentTurn] = useState(1);
    let [placedDisks, setPlacedDisks] = useState(
        Array(GRID_HEIGHT)
            .fill()
            .map(() => Array(GRID_WIDTH).fill(0))
    );
    let [winner, setWinner] = useState(0);
    let [showModal, setShowModal] = useState(false);

    const gridRef = useRef(null);
    const roundTimer = useRef(null);
    const canPlace = useRef(true);

    useEffect(() => {
        roundTimer.current = setInterval(() => setTimeLeft(timeLeft - 1), 1000);

        if (timeLeft === 0) {
            setCurrentTurn((turn) => (turn === 1 ? 2 : 1));
            setTimeLeft(TIME_PER_TURN);
        }

        return () => {
            clearInterval(roundTimer.current);
        };
    }, [timeLeft]);

    function handleGridClick(event) {
        if (winner === 0 && canPlace.current) {
            processGridClick(event);

            canPlace.current = false;
            setTimeout(() => (canPlace.current = true), 600);
        }
    }

    function processGridClick(event) {
        let boundingRect = event.target.getBoundingClientRect();
        let gridSpaceMouseX = event.clientX - boundingRect.x;

        // Important that width is used for cellWidth. Grid has extra height
        // at the bottom..
        let cellSize = boundingRect.width / GRID_WIDTH;
        let cellX = Math.floor(gridSpaceMouseX / cellSize);
        let finalCellY = 0;

        for (let cellY = 5; cellY >= 0; cellY--) {
            if (placedDisks[cellY][cellX] === 0) {
                finalCellY = cellY;
                setCurrentTurn(currentTurn === 1 ? 2 : 1);
                setTimeLeft(TIME_PER_TURN);
                break;
            }
        }

        let newPlacedDisks = placedDisks.map((row, index) => {
            if (finalCellY == index) {
                return row.map((value, innerIndex) => {
                    if (cellX == innerIndex) {
                        return currentTurn;
                    } else {
                        return value;
                    }
                });
            } else {
                return row;
            }
        });
        setPlacedDisks(newPlacedDisks);
        let win = checkWin(
            { x: cellX, y: finalCellY },
            currentTurn,
            newPlacedDisks
        );

        if (win) {
            handleWin();
        }
    }

    function restart() {
        setPlacedDisks(
            Array(GRID_HEIGHT)
                .fill()
                .map(() => Array(GRID_WIDTH).fill(0))
        );
        setCurrentTurn(1);
        setTimeLeft(TIME_PER_TURN);
        setWinner(0);
    }

    function handleWin() {
        if (currentTurn == 1) {
            setPlayer1Score(player1Score + 1);
        } else if (currentTurn == 2) {
            setPlayer2Score(player2Score + 1);
        }

        setWinner(currentTurn);
    }

    function checkWin(lastDiskPosition, lastPlayer, nextPlacedDisksState) {
        const { x, y } = lastDiskPosition;
        let consecutive = 0;
        // Horizontal check
        for (let i = 0; i < GRID_WIDTH; i++) {
            if (nextPlacedDisksState[y][i] == lastPlayer) {
                consecutive++;
                if (consecutive == 4) {
                    return true;
                }
            } else {
                consecutive = 0;
            }
        }

        // Vertical check
        consecutive = 0;
        for (let j = 0; j < GRID_HEIGHT; j++) {
            if (nextPlacedDisksState[j][x] == lastPlayer) {
                consecutive++;
                if (consecutive == 4) {
                    return true;
                }
            } else {
                consecutive = 0;
            }
        }

        // Diagonal 1 (main diagonal) check
        let workingX = x;
        let workingY = y;
        consecutive = 0;
        while (workingX !== 0 && workingY !== 0) {
            workingX--;
            workingY--;
        }

        while (workingX <= GRID_HEIGHT && workingY <= 5) {
            if (nextPlacedDisksState[workingY][workingX] == lastPlayer) {
                consecutive++;
                if (consecutive == 4) {
                    return true;
                }
            } else {
                consecutive = 0;
            }
            workingX++;
            workingY++;
        }

        // Diagonal 2 (anti-diagonal) check
        workingX = x;
        workingY = y;
        consecutive = 0;
        while (workingX !== GRID_HEIGHT && workingY !== 0) {
            workingX++;
            workingY--;
        }

        while (workingX >= 0 && workingY <= 5) {
            if (nextPlacedDisksState[workingY][workingX] == lastPlayer) {
                consecutive++;
                if (consecutive == 4) {
                    return true;
                }
            } else {
                consecutive = 0;
            }
            workingX--;
            workingY++;
        }
        return false;
    }

    function createDiskElements() {
        let diskElements = [];
        for (let rowNum = 0; rowNum < GRID_HEIGHT; rowNum++) {
            for (let columnNum = 0; columnNum < GRID_WIDTH; columnNum++) {
                if (placedDisks[rowNum][columnNum] === 1) {
                    diskElements.push(
                        <Disk
                            key={rowNum + "," + columnNum}
                            gridX={columnNum}
                            gridY={rowNum}
                            player="1"
                        ></Disk>
                    );
                } else if (placedDisks[rowNum][columnNum] === 2) {
                    diskElements.push(
                        <Disk
                            key={rowNum + "," + columnNum}
                            gridX={columnNum}
                            gridY={rowNum}
                            player="2"
                        ></Disk>
                    );
                }
            }
        }
        return diskElements;
    }

    return (
        <div className={styles.viewContainer}>
            <header className={styles.header}>
                <button
                    className={styles.menuButton}
                    onClick={() => setShowModal(true)}
                >
                    Menu
                </button>
                <img
                    src={logo}
                    className={styles.logo}
                    alt="Connect Four logo"
                />
                <button className={styles.restartButton} onClick={restart}>
                    Restart
                </button>
            </header>
            <main className={styles.contentContainer}>
                <div className={styles.gridAndScores}>
                    <div className={styles.scoreCard}>
                        <div className={styles.playerNumber}>Player 1</div>
                        <div className={styles.playerScore}>{player1Score}</div>
                        <img src={player1} alt="" />
                    </div>
                    <div
                        className={styles.scoreCard + " " + styles.scoreCardRHS}
                    >
                        <div className={styles.playerNumber}>Player 2</div>
                        <div className={styles.playerScore}>{player2Score}</div>
                        <img src={player2} alt="" />
                    </div>
                    <div
                        className={styles.grid}
                        ref={gridRef}
                        onClick={handleGridClick}
                    >
                        <img
                            className={styles.gridBack}
                            src={gridBack}
                            alt=""
                        />
                        <div className={styles.diskContainer}>
                            {createDiskElements()}
                        </div>

                        <img
                            className={styles.gridFront}
                            src={gridFront}
                            alt=""
                            draggable="false"
                        />
                    </div>
                </div>
                <PlayerIndicator
                    timeLeft={timeLeft}
                    currentTurn={currentTurn}
                    setCurrentTurn={setCurrentTurn}
                    winner={winner}
                    restart={restart}
                />
            </main>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onAfterOpen={() => clearInterval(roundTimer.current)}
                onAfterClose={() =>
                    (roundTimer.current = setInterval(
                        () => setTimeLeft(timeLeft - 1),
                        1000
                    ))
                }
                appElement={document.getElementById("root")}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
                closeTimeoutMS={600}
            >
                <h1>Pause</h1>
                <button
                    className="linkButton"
                    style={{ justifyContent: "center" }}
                    onClick={() => setShowModal(false)}
                >
                    Continue Game
                </button>
                <button
                    className="linkButton"
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                        restart();
                        setShowModal(false);
                    }}
                >
                    Restart
                </button>
                <Link
                    to="/"
                    className="linkButton linkButtonSalmon"
                    style={{ justifyContent: "center" }}
                >
                    Quit Game
                </Link>
            </Modal>
        </div>
    );
}
