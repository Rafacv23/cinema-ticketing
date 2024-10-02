"use client"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

export default function Celebration() {
  const { width, height } = useWindowSize()

  return (
    <Confetti
      width={width}
      height={height}
      opacity={0.1}
      className="w-full"
      numberOfPieces={50}
      tweenDuration={10000}
    />
  )
}
