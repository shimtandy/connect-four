import styles from './play.module.css';
import logo from '../assets/images/logo.svg';
import player1 from '../assets/images/you.svg';
import player2 from '../assets/images/cpu.svg';
import gridFront from '../assets/images/grid-front-layer.svg';
import gridBack from '../assets/images/grid-back-layer.svg';
import { useRef, useEffect, useState } from 'react';
import Disk from '../components/Disk';
import PlayerIndicator from '../components/PlayerIndicator';

export default function Play() {
    const TIME_PER_TURN = 20

    let [timeLeft, setTimeLeft] = useState(TIME_PER_TURN)
    let [player1Score, setPlayer1Score] = useState(0);
    let [player2Score, setPlayer2Score] = useState(0);
    let [currentTurn, setCurrentTurn] = useState(1);
    let [placedDisks, setPlacedDisks] = useState(Array(6).fill().map(() => Array(7).fill(0)))
    let [winner, setWinner] = useState(0);
    const gridRef = useRef(null)

    useEffect(() => {
            let timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000)

            if (timeLeft === 0) {
                setCurrentTurn(turn => turn === 1 ? 2 : 1)
                setTimeLeft(TIME_PER_TURN)
            }
    
            // Closure over timer variable
            return () => {clearInterval(timer)}
        }, [timeLeft])


    function handleGridClick(event) {
        let boundingRect = event.target.getBoundingClientRect()
        let gridSpaceMouseX = event.clientX - boundingRect.x

        // Important that width is used for cellWidth. Grid has extra height
        // at the bottom..
        let cellSize = boundingRect.width / 7
        let cellX = Math.floor(gridSpaceMouseX / cellSize)
        let finalCellY = 0

        for (let cellY = 5; cellY >= 0; cellY--) {
            if (placedDisks[cellY][cellX] === 0) {
                finalCellY = cellY
                setCurrentTurn(currentTurn === 1 ? 2 : 1)
                setTimeLeft(TIME_PER_TURN)
                break
            }
        }

        let newPlacedDisks = placedDisks.map((row, index) => {
            if ((finalCellY == index)) {
                return row.map((value, innerIndex) => {
                    if (cellX == innerIndex) {
                        return currentTurn
                    } else {
                        return value
                    }
                })
            } else {
                return row
            }
        })
        setPlacedDisks(newPlacedDisks)
        let win = checkWin({x: cellX, y: finalCellY}, currentTurn, newPlacedDisks)

        if (win) {
            handleWin()
        }
    }


    function restart() {
        setPlacedDisks(Array(6).fill().map(() => Array(7).fill(0)))
        setCurrentTurn(1)
        setTimeLeft(TIME_PER_TURN)
        setWinner(0)
    }

    
    function handleWin() {
        if (currentTurn == 1) {
            setPlayer1Score(player1Score + 1)
        } else if (currentTurn == 2) {
            setPlayer2Score(player2Score + 1)
        }

        setWinner(currentTurn)

    }


    function checkWin(lastDiskPosition, lastPlayer, nextPlacedDisksState) {
        const {x, y} = lastDiskPosition
        let consecutive = 0
        // Horizontal check
        for (let i=0; i<7; i++) {
            if (nextPlacedDisksState[y][i] == lastPlayer) {
                consecutive++
                if (consecutive == 4) {
                    return true
                }
            } else {
                consecutive = 0
            }
        }

        // Vertical check
        consecutive = 0;
        for (let j=0; j<6; j++) {
            if (nextPlacedDisksState[j][x] == lastPlayer) {
                consecutive++
                if (consecutive == 4) {
                    return true
                }
            } else {
                consecutive = 0
            }
        }

        // Diagonal 1 (main diagonal) check
        let workingX = x
        let workingY = y
        consecutive = 0;
        while (workingX !== 0 && workingY !== 0) {
            workingX--
            workingY--
        }

        while (workingX <= 6 && workingY <= 5) {
            if (nextPlacedDisksState[workingY][workingX] == lastPlayer) {
                consecutive++
                if (consecutive == 4) {
                    return true
                }
            } else {
                consecutive = 0
            }
            workingX++
            workingY++
        }

        // Diagonal 2 (anti-diagonal) check
        workingX = x
        workingY = y
        consecutive = 0
        while (workingX !== 6 && workingY !== 0) {
            workingX++
            workingY--
        }

        while (workingX >= 0 && workingY <= 5) {
            if (nextPlacedDisksState[workingY][workingX] == lastPlayer) {
                consecutive++
                if (consecutive == 4) {
                    return true
                }
            } else {
                consecutive = 0
            }
            workingX--
            workingY++
        }
        return false
    }


    function createDiskElements() {
        let diskElements = []
        for (let rowNum = 0; rowNum < 6; rowNum++) {
            for (let columnNum = 0; columnNum < 7; columnNum++) {
                if (placedDisks[rowNum][columnNum] === 1) {
                    diskElements.push(
                        <Disk 
                            key={rowNum + "," + columnNum} 
                            gridX={columnNum} 
                            gridY={rowNum}
                            player='1'>
                        </Disk>
                    )
                } else if (placedDisks[rowNum][columnNum] === 2) {
                    diskElements.push(
                        <Disk 
                            key={rowNum + "," + columnNum} 
                            gridX={columnNum} 
                            gridY={rowNum}
                            player='2'>
                        </Disk>)
                }
            }
        }
        return diskElements
    }

    return (
        <div className={styles.viewContainer}>
            <header className={styles.header}>
                <button className={styles.menuButton}>Menu</button>
                <img src={logo} className={styles.logo} alt='Connect Four logo' />
                <button 
                    className={styles.restartButton}
                    onClick={restart}>
                        Restart
                </button>
            </header>
            <main className={styles.contentContainer}>
                <div className={styles.gridAndScores}>
                    <div className={styles.scoreCard}>
                        <div className={styles.playerNumber}>Player 1</div>
                        <div className={styles.playerScore}>{player1Score}</div>
                        <img src={player1} alt='' />
                    </div>
                    <div className={styles.scoreCard + ' ' + styles.scoreCardRHS}>
                        <div className={styles.playerNumber}>Player 2</div>
                        <div className={styles.playerScore}>{player2Score}</div>
                        <img src={player2} alt='' />
                    </div>
                    <div
                        className={styles.grid}
                        ref={gridRef}
                        onClick={handleGridClick}>
                        <img className={styles.gridBack} src={gridBack} alt='' />
                        {createDiskElements()}
                        <img className={styles.gridFront} src={gridFront} alt='' />
                    </div>
                </div>
                {/* Key is used to prevent the indicator for different players sharing the same timer state.
                    This occurs because the component is always in the same place in the render tree. */}
                <PlayerIndicator
                    timeLeft={timeLeft}
                    currentTurn={currentTurn} 
                    setCurrentTurn={setCurrentTurn}
                    winner={winner}
                    restart={restart}
                />
            </main>
        </div>
    )
}