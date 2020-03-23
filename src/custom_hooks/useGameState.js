import React, {useEffect, useState} from 'react';
import MathUtils from "../utils/MathUtils";

const MAX_NUMBER = 9;

const useGameState = () => {
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [stars, setStars] = useState(MathUtils.random(1, MAX_NUMBER));
    const [availableNumbers, setAvailableNumbers] = useState(MathUtils.range(1, MAX_NUMBER));
    const [candidateNumbers, setCandidateNumbers] = useState([]);

    useEffect(() => {
        if(secondsLeft > 0 && availableNumbers.length > 0){
            const timeId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timeId);
        }
    })

    const setGameState = (newCandidateNumbers) => {
        if(MathUtils.sum(newCandidateNumbers) != stars) {
            setCandidateNumbers(newCandidateNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter(
                n => !newCandidateNumbers.includes(n)
            );
            setStars(MathUtils.randomSumIn(newAvailableNumbers, MAX_NUMBER));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([]);
        }
    }
    return {
        stars,
        availableNumbers,
        candidateNumbers,
        secondsLeft,
        setGameState
    };
}

export default useGameState;
