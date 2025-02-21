"use client"

import { useState } from "react"

export default function Question({ question, onAnswer }) {
  const [inputValue, setInputValue] = useState("")

  if (question.type === "multiple") {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">{question.question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="p-4 text-left border rounded-lg hover:bg-blue-50 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <div className="flex space-x-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your answer"
        />
        <button
          onClick={() => {
            onAnswer(inputValue)
            setInputValue("")
          }}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

