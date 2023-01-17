import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Tile from './Tile'
import statusContext from '../context/gameStatus/statusContext'

import { revealNeighbors, getRandomIndices, setNeighborCount, isHidden } from '../utils/BoardFunctions'

const Board = ({ height, width, bombs, flags, setFlags }) => {
    const scontext = useContext(statusContext)
    const { victory, defeat, setVictory, setDefeat } = scontext

    // fix diplayed grid to have proper dimensions
    const gridStyle = {
        gridTemplate: `repeat(${width}, 1fr) / repeat(${height}, 1fr)`
    }

    // functions      
    // initialize board with bombs and values
    const initializeBoard = () =>{
        const values = Array.from({ length: width }, () => Array(height).fill(0)); //all zeros
        let board = []
        for(let i=0; i<width; i++){
            board.push([])
            for(let j=0; j<height; j++){
                board[i][j] = {
                    x: i,
                    y: j,
                    value: values[i][j],
                    isFlagged: false,
                    isRevealed: false
                 }
            }
        }

        // set random bombs
        const bomb_pos = getRandomIndices(bombs, width, height)
        for(let pos of bomb_pos){
            board[pos[0]][pos[1]].value = -1
        }

        // fix all cells according to bomb positions
        board = setNeighborCount(board)
        return board
    }

    //reveal board on game end
    const revealBoard = () => {
        let updated = [...board]
        for(let i=0; i<board.length; i++){
            for(let j=0; j<board[i].length; j++){
                updated[i][j].isRevealed = true
            }
        }
        setBoard(updated)
    }

    // handle tile left click
    const handeCellClick = (i, j) => {
        let updated = [...board]         // tell react state changed
        if(!updated[i][j].isRevealed && !updated[i][j].isFlagged){
            if(updated[i][j].value !== 0){
                updated[i][j].isRevealed = true
                // if bomb
                if(updated[i][j].value === -1){
                    revealBoard()
                    alert("You lose!")
                    setDefeat()
                }
                // if last non-bomb square
                if(isHidden(board) === bombs){
                    revealBoard()
                    alert("You win!")
                    setVictory()
                }
            }
            else{
                // reveal all null neighbors
                revealNeighbors(updated, i, j)
            }
        }

        // update state
        setBoard(updated)
    }

    // handle tile right click
    const onContextMenu = (e, i, j) => {
        e.preventDefault()
        let updated = [...board]
        if(!updated[i][j].isRevealed){
            if(updated[i][j].isFlagged){
                updated[i][j].isFlagged = !updated[i][j].isFlagged
                setFlags(flags+1)
            }
            else{
                if(flags > 0){
                    setFlags(flags-1)
                    updated[i][j].isFlagged = !updated[i][j].isFlagged
                }
            }
        }

        // update state
        setBoard(updated)
    }

    const [board, setBoard] = useState(initializeBoard())
    useEffect(() => {
        if(!victory && !defeat)
            setBoard(initializeBoard())
            setFlags(bombs)
    }, [victory, defeat])

    return (
        <div className='grid-4' style={gridStyle} >
            {board.map(line => (
                line.map(tile => (
                    <Tile key={tile.x * line.length + tile.y} 
                        tile={tile} 
                        onClick={() => handeCellClick(tile.x,tile.y)}
                        onContextMenu={(e) => onContextMenu(e, tile.x,tile.y)} />
                ))
            ))}
        </div>
    )
}

Board.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    bombs: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
    setFlags: PropTypes.func.isRequired
}

export default Board