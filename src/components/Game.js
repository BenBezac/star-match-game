import React, {useEffect, useState} from 'react';
import MathUtils from "../utils/MathUtils";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";
import NumberButton from "./NumberButton";
import useGameState from "../custom_hooks/useGameState";

const MAX_NUMBER = 9;

const Game = ({startNewGame}) => {
    const {
        stars,
        availableNumbers,
        candidateNumbers,
        secondsLeft,
        setGameState
    } = useGameState()

    const candidatesAreWrong = MathUtils.sum(candidateNumbers) > stars;
    const gameStatus = availableNumbers.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'inprogress';
    const numberList = MathUtils.range(1, MAX_NUMBER);

    const getNumberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }
        if (candidateNumbers.includes(number)) {
            return candidatesAreWrong ? 'wrong': 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, status) => {
        if(status === 'used' || gameStatus != 'inprogress') { return; }

        const newCandidateNumbers =
            status === 'available'
                ? candidateNumbers.concat(number)
                : candidateNumbers.filter(cn => cn !== number);

        setGameState(newCandidateNumbers);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    { gameStatus === 'inprogress' ? (
                        <StarsDisplay count={stars}/>
                    ) : (
                        <PlayAgain
                            onClick={startNewGame}
                            gameStatus={gameStatus}
                        />
                    )}
                </div>
                <div className="right">
                    { numberList.map(number =>
                        <NumberButton
                            key={number}
                            value={number}
                            status={getNumberStatus(number)}
                            onClick={onNumberClick}
                        />
                    ) }
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
}

export default Game;
