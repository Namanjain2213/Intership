export default function History({ history }) {
    if (!history.length) {
      return <div className="text-center py-8 text-gray-500">No quiz attempts yet. Take a quiz to see your history!</div>
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Quiz History</h2>
        <div className="grid gap-4">
          {history.map((attempt, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Attempt #{history.length - index}</div>
                <div className="text-sm text-gray-500">{new Date(attempt.date).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  Score: {attempt.score}/{attempt.totalQuestions} (
                  {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                </div>
                <div className="text-sm text-gray-500">
                  Time: {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  