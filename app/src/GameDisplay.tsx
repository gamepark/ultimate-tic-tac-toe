/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {Letterbox} from '@gamepark/react-components'
import Game from '@gamepark/ultimate-tic-tac-toe/Game'
import Grid from './Grid'
import Mark from '@gamepark/ultimate-tic-tac-toe/Mark'

type Props = {
  game: Game
}

export default function GameDisplay({game}: Props) {
  console.log(game)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <Grid css={gridPosition } grid={[[
        null, Mark.O, Mark.X
      ], [
        null, Mark.O, null
      ], [
        null, null, null
      ]]}/>
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

const gridPosition = css`
  position: absolute;
  top: 10em;
  left: 10em;
`