import * as React from 'react';
import styles from './level.module.css';

const initial = 785.3981633974


const Level = () => {

    const [currentXp, setCurrentXp] = React.useState(initial);
    // current / totalXp

    React.useEffect(() => {
        setTimeout(() => {
            setCurrentXp(785.3981633974 * (1 - 0.48))
        }, 1000)
    }, [])


    return (
        <div className={styles.levelContainer}>
            <svg viewBox='0 0 450 450' xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id='glow'>
                        <feGaussianBlur className='blur' result='coloredBlur' stdDeviation={4} />
                        <feMerge>
                            <feMergeNode in='coloredBlur' />
                            <feMergeNode in='coloredBlur' />
                            <feMergeNode in='SourceGraphic' />
                        </feMerge>
                    </filter>
                </defs>
                <circle cx="225" cy="225" r="125" fill='#151718' stroke="#242627" strokeWidth={8} />
                <circle className={styles.circle} cx="225" cy="225" r="125" transform='rotate(-90 225 225)' fill='transparent' strokeWidth={5} strokeDashoffset={currentXp} strokeDasharray={785.3981633974} />
            </svg>
        </div>
    );
}

export default Level;