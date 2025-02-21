export default function Result({ score, totalQuestions, onRestart, timeSpent, isTimeUp }) {
    const percentage = Math.round((score / totalQuestions) * 100)
  
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">{isTimeUp ? "Time's Up!" : "Quiz Completed!"}</h2>
        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <div className="text-4xl font-bold text-blue-500">
            {score}/{totalQuestions}
          </div>
          <div className="text-xl text-gray-600">{percentage}% Score</div>
          <div className="text-gray-500">
            Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="text-lg font-medium text-gray-700">
            {percentage >= 80
              ? "Excellent!"
              : percentage >= 60
                ? "Good job!"
                : percentage >= 40
                  ? "Keep practicing!"
                  : "Need more practice!"}
          </div>
        </div>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  