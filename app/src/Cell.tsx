/** @jsxImportSource @emotion/react */
import Mark from '@gamepark/ultimate-tic-tac-toe/Mark'
import {css} from '@emotion/react'

type Props = {
  cell: Mark | null
}

export default function Cell({cell}: Props) {
  return (
    <div css={cellCss}>
      <span css={markCss}>
        {cell === Mark.O ? 'O' : cell === Mark.X ? 'X' : null}
      </span>
    </div>
  )
}

export const cellSize = 9

const cellCss = css`
  width: ${cellSize}em;
  height: ${cellSize}em;
  background-color: white;
  line-height: ${cellSize}em;
  text-align: center;
`

const markCss = css`
  color: black;
  font-size: ${0.8 * cellSize}em;
  vertical-align: middle;
`
