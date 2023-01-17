import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';

const Tile = ({ tile, onClick, onContextMenu }) => {
    const flag_icon = <FontAwesomeIcon className="icon-primary" icon={faFlag} />
    const bomb_icon = <FontAwesomeIcon  icon={faBomb} />

    let {value, isFlagged, isRevealed} = tile

    const tileStyle = {
        backgroundColor: isRevealed && "#80ced6",
        cursor: isRevealed && "default"
    }

    const showValue = () => {
        if(!isRevealed) {
            return isFlagged ? flag_icon : null
        }
        if(value === -1)
            return bomb_icon
        else if(value === 0)
            return null
        else return value
    }

    return (
        <div className="tile" onClick={onClick} onContextMenu={onContextMenu} style={tileStyle}>
            {showValue()}
        </div>
    )
}

Tile.propTypes = {
    tile: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired
}

export default Tile