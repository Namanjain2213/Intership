"use client"

import { useState, useEffect } from "react"

export default function Timer({ duration, onTimeUp, onTick }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
      onTick && onTick(timeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, onTick])

  return (
    <div className="text-lg font-mono">
      <span className={`${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700"}`}>{timeLeft}s</span>
    </div>
  )
}

