import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import Timer from './Timer'
import statusContext from '../context/gameStatus/statusContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faSmile, faFaceDizzy, faFaceGrin } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Topbar = ({ flags }) => {
  const scontext = useContext(statusContext)
  const { victory, defeat, refreshGame } = scontext

  const onClick = () => {
    refreshGame()
  }

  const flag_icon = <FontAwesomeIcon className="icon-primary" icon={faFlag} />
  const game_icon = <FontAwesomeIcon icon={victory ?  faFaceGrin : (defeat ? faFaceDizzy : faSmile)} />

  return (
    <div>
      <h2 className='game_head bg-light'>Minesweeper</h2>
      <div className="navbar bg-light">
        <div>
          <Timer />
        </div>
        <div className="grid-1">
          <Popup trigger={
              <button className="game_icon" disabled={!victory && !defeat} onClick={onClick}>
                {game_icon}
              </button>
            } position="bottom center" on={['hover', 'focus']}>
            <span>Refresh game</span>
          </Popup>
        </div>
        <div className="grid-2">
          <h3>
            {flags}
          </h3>
          <span>{flag_icon}</span>
        </div>
    </div>
    </div>
  )
}

Topbar.propTypes = {
  flags: PropTypes.number.isRequired
}

export default Topbar