import { Link } from "react-router";
import styles from "./rules.module.css";
import { AnimatePresence, motion } from "motion/react";
import { easeIn, easeInOut } from "motion";

export default function Rules() {
    return (
        <div className={styles.viewContainer}>
            <AnimatePresence>
                <motion.div
                    className={styles.contentContainer}
                    initial={{
                        transform: "scale(0)",
                        opacity: 0,
                    }}
                    animate={{
                        transform: "scale(100%)",
                        opacity: 1,
                    }}
                    exit={{
                        transform: "scale(0)",
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1.0,
                        ease: easeInOut,
                    }}
                >
                    <h1>Rules</h1>
                    <h2>Objective</h2>
                    <p>
                        Be the first player to connect 4 of the same colored
                        discs in a row (either vertically, horizontally, or
                        diagonally).
                    </p>
                    <h2>How To Play</h2>
                    <ol>
                        <li>Red goes first in the first game.</li>
                        <li>
                            Players must alternate turns, and only one disc can
                            be dropped in each turn.
                        </li>
                        <li>
                            The game ends when there is a 4-in-a-row or a
                            stalemate.
                        </li>
                        <li>
                            The starter of the previous game goes second on the
                            next game.
                        </li>
                    </ol>
                    <Link to="/">
                        {/* TODO: Add text version of button for accessibility */}
                        <svg
                            width="70"
                            height="75"
                            viewBox="0 0 70 75"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Group 2">
                                <g id="Oval Copy 11">
                                    <circle
                                        cx="35"
                                        cy="35"
                                        r="32"
                                        fill="#FD6687"
                                    />
                                    <circle
                                        id="tickCircleBorder"
                                        cx="35"
                                        cy="35"
                                        r="33.5"
                                        stroke="black"
                                        strokeWidth="3"
                                    />
                                </g>
                                <path
                                    id="Path"
                                    d="M20 34.5819L30.264 44.846L50.11 25"
                                    stroke="white"
                                    strokeWidth="3"
                                />
                            </g>
                        </svg>
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
