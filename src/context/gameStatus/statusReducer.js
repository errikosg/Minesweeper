import {
    VICTORY,
    DEFEAT,
    REFRESH_GAME
  } from '../types';

export default (state, action) => {
    switch (action.type) {
        case VICTORY:
            return {
                ...state, 
                victory : true
            }
        case DEFEAT:
            return {
                ...state, 
                defeat : true
            }
        case REFRESH_GAME:
            return {
                ...state,
                victory: false,
                defeat: false
            }
        default:
            return state;
    }
}