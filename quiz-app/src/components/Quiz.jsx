"use client"

import { useState } from "react"
import Question from "./question"
import Timer from "./Timer"
import Result from "./Result"

const questions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: "Mercury",
    type: "multiple",
  },
  {
    id: 2,
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    type: "multiple",
  },
  {
    id: 3,
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML",
    type: "multiple",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    correctAnswer: "Au",
    type: "multiple",
  },
  {
    id: 5,
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    correctAnswer: "Filtration",
    type: "multiple",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    correctAnswer: "40",
    type: "integer",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    correctAnswer: "50",
    type: "integer",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    correctAnswer: "1776",
    type: "integer",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    correctAnswer: "3",
    type: "integer",
  },
  {
    id: 10,
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    correctAnswer: "120",
    type: "integer",
  },
]

export default function Quiz({ onQuizComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState({})
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)

  const handleAnswer = (answer) => {
    const isCorrect =
      questions[currentQuestion].type === "multiple"
        ? answer === questions[currentQuestion].correctAnswer
        : answer === questions[currentQuestion].correctAnswer

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { answer, isCorrect },
    }))

    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
      onQuizComplete({
        score: score + (isCorrect ? 1 : 0),
        totalQuestions: questions.length,
        timeSpent,
      })
    }
  }

  const handleTimeUp = () => {
    setIsTimeUp(true)
    setShowResult(true)
    onQuizComplete({
      score,
      totalQuestions: questions.length,
      timeSpent: 300, // 5 minutes in seconds
    })
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setAnswers({})
    setTimeSpent(0)
    setIsTimeUp(false)
  }

  if (showResult) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRestart={restartQuiz}
        timeSpent={timeSpent}
        isTimeUp={isTimeUp}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <Timer
          duration={30}
          onTimeUp={handleTimeUp}
          onTick={(remainingTime) => setTimeSpent((prev) => prev + 1)}
          key={currentQuestion}
        />
      </div>
      <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

