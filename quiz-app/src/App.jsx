"use client"

import { useState, useEffect } from "react"
import Quiz from "./components/Quiz"
import History from "./components/History"

export default function App() {
  const [showHistory, setShowHistory] = useState(false)
  const [quizHistory, setQuizHistory] = useState([])

  useEffect(() => {
    // Initialize IndexedDB
    const request = indexedDB.open("QuizDB", 1)

    request.onerror = (event) => {
      console.error("Database error:", event.target.error)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("quizAttempts")) {
        db.createObjectStore("quizAttempts", { keyPath: "id", autoIncrement: true })
      }
    }
  }, [])

  const saveQuizResult = (result) => {
    const request = indexedDB.open("QuizDB", 1)

    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(["quizAttempts"], "readwrite")
      const store = transaction.objectStore("quizAttempts")

      const attempt = {
        date: new Date().toISOString(),
        score: result.score,
        totalQuestions: result.totalQuestions,
        timeSpent: result.timeSpent,
      }

      store.add(attempt)
    }
  }

  const loadHistory = () => {
    const request = indexedDB.open("QuizDB", 1)

    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(["quizAttempts"], "readonly")
      const store = transaction.objectStore("quizAttempts")
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => {
        setQuizHistory(getAllRequest.result)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Interactive Quiz</h1>
                  <button
                    onClick={() => {
                      if (!showHistory) loadHistory()
                      setShowHistory(!showHistory)
                    }}
                    className="bg-blue-500 text-white ml-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {showHistory ? "Take Quiz" : "View History"}
                  </button>
                </div>
                {showHistory ? <History history={quizHistory} /> : <Quiz onQuizComplete={saveQuizResult} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

