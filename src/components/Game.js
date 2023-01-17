import React, { Fragment, useState,useEffect } from 'react'
import Topbar from './Topbar'
import Board from './Board'

const Game = () => {
    const [ height, setHeight] = useState(8)
    const [ width, setWidth ]= useState(8)
    const [ bombs, setBombs ]= useState(10)
    const [ flags, setFlags ] = useState(bombs)
    
    return (
        <Fragment>
            <Topbar flags={flags} />
            <Board height={height} width={width} bombs={bombs} flags={flags} setFlags={setFlags} />
        </Fragment>
    )
}

export default Game