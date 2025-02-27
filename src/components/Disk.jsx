import { motion } from "motion/react";
import styles from "./disk.module.css";

// From https://easings.net/#easeOutBounce under GNU GPL3 license.
function bounceEase(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

export default function Disk({ gridX, gridY, player }) {
    return (
        <motion.div
            className={
                styles.disk +
                " " +
                (player == 1 ? styles.player1 : styles.player2)
            }
            initial={{
                top: 0,
            }}
            animate={{
                top: gridY * (1 / 6) * 100 + "%",
            }}
            transition={{
                duration: 1,
                ease: bounceEase,
            }}
            style={{
                left: gridX * (1 / 7) * 100 + "%",
            }}
        />
    );
}
