/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {Letterbox} from '@gamepark/react-components'
import Game from '@gamepark/ultimate-tic-tac-toe/Game'
import Grid from './Grid'
import {cellSize} from './Cell'
import {usePlay} from '@gamepark/react-client'
import MarkCell from '@gamepark/ultimate-tic-tac-toe/MarkCell'

type Props = {
  game: Game
}

export default function GameDisplay({game}: Props) {
  const play = usePlay<MarkCell>()
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      {game.board.map((row, rowIndex) =>
        row.map((grid, columnIndex) =>
          <Grid key={`${rowIndex}_${columnIndex}`} css={gridPosition(rowIndex, columnIndex)} grid={grid}
                onCellClick={(gridRow, gridColumn) => play({x: columnIndex, y: rowIndex, i: gridColumn, j: gridRow})}/>
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

const gridGap = 3

const gridPosition = (rowIndex: number, columnIndex: number) => css`
  position: absolute;
  top: ${10 + rowIndex * (cellSize * 3 + gridGap)}em;
  left: ${10 + columnIndex * (cellSize * 3 + gridGap)}em;
`