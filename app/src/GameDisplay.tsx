/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {Letterbox} from '@gamepark/react-components'
import Game from '@gamepark/ultimate-tic-tac-toe/Game'
import Grid from './Grid'
import {usePlay, usePlayerId} from '@gamepark/react-client'
import MarkCell from '@gamepark/ultimate-tic-tac-toe/MarkCell'
import Mark from '@gamepark/ultimate-tic-tac-toe/Mark'

type Props = {
  game: Game
}

export default function GameDisplay({game}: Props) {
  const play = usePlay<MarkCell>()
  const playerId = usePlayerId<Mark>()
  console.log(game)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      {game.board.map((gridRow, rowIndex) =>
        gridRow.map((grid, columnIndex) =>
          <Grid key={`${rowIndex}-${columnIndex}`} css={gridPosition(rowIndex, columnIndex)} grid={grid}
                onCellClick={(cellRowIndex, cellColumnIndex) => playerId && play({mark: playerId, i: cellColumnIndex, j: cellRowIndex, x: columnIndex, y: rowIndex})}/>
        )
      )}
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

const gridPosition = (row: number, column: number) => css`
  position: absolute;
  top: ${10 + column * 30}em;
  left: ${10 + row * 30}em;
`