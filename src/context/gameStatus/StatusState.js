import React, { useReducer } from 'react';
import statusContext from './statusContext';
import StatusReducer from './statusReducer';
import {
    VICTORY,
    DEFEAT,
    REFRESH_GAME
  } from '../types';

// This file is where all the actions are (for example actions to fetch data etc.)

const StatusState = props => {
    const initialState = {
        victory: false,
        defeat: false
    }
    const [state, dispatch] = useReducer(StatusReducer, initialState);

    // functions
    const setVictory = () => dispatch({ type: VICTORY });
    const setDefeat = () => dispatch({ type: DEFEAT });
    const refreshGame = () => dispatch({ type: REFRESH_GAME })

    return (
        <statusContext.Provider
            value={{
                victory: state.victory,
                defeat: state.defeat,
                setVictory,
                setDefeat,
                refreshGame
            }}
        >
            {props.children}
        </statusContext.Provider>
    )
}

export default StatusState