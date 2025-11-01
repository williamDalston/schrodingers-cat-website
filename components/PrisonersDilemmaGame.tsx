'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { XCircleIcon, UserIcon } from '@heroicons/react/24/outline'

type Decision = 'cooperate' | 'defect' | null

interface GameResult {
  playerDecision: Decision
  opponentDecision: Decision
  playerScore: number
  opponentScore: number
  round: number
}

export default function PrisonersDilemmaGame() {
  const [playerDecision, setPlayerDecision] = useState<Decision>(null)
  const [opponentDecision, setOpponentDecision] = useState<Decision>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameHistory, setGameHistory] = useState<GameResult[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [totalPlayerScore, setTotalPlayerScore] = useState(0)
  const [totalOpponentScore, setTotalOpponentScore] = useState(0)
  const [opponentStrategy, setOpponentStrategy] = useState<'random' | 'always-defect' | 'tit-for-tat'>('random')
  const [gameOver, setGameOver] = useState(false)
  const [explanation, setExplanation] = useState<string>('')

  const MAX_ROUNDS = 10

  const payoffMatrix = {
    bothCooperate: { player: 3, opponent: 3 },
    playerDefectsOpponentCooperates: { player: 5, opponent: 0 },
    playerCooperatesOpponentDefects: { player: 0, opponent: 5 },
    bothDefect: { player: 1, opponent: 1 },
  }

  const calculateScores = (player: Decision, opponent: Decision) => {
    if (player === 'cooperate' && opponent === 'cooperate') {
      return payoffMatrix.bothCooperate
    } else if (player === 'defect' && opponent === 'cooperate') {
      return payoffMatrix.playerDefectsOpponentCooperates
    } else if (player === 'cooperate' && opponent === 'defect') {
      return payoffMatrix.playerCooperatesOpponentDefects
    } else {
      return payoffMatrix.bothDefect
    }
  }

  const getOpponentDecision = (strategy: string, history: GameResult[]): Decision => {
    if (strategy === 'always-defect') {
      return 'defect'
    } else if (strategy === 'tit-for-tat') {
      if (history.length === 0) {
        return 'cooperate' // Start by cooperating
      }
      // Mirror the player's last move
      const lastResult = history[history.length - 1]
      if (!lastResult) return 'cooperate'
      return lastResult.playerDecision === 'cooperate' ? 'cooperate' : 'defect'
    } else {
      // Random strategy
      return Math.random() > 0.5 ? 'cooperate' : 'defect'
    }
  }

  const handleDecision = (decision: Decision) => {
    if (playerDecision !== null || gameOver) return

    setPlayerDecision(decision)
    const opponent = getOpponentDecision(opponentStrategy, gameHistory)
    setOpponentDecision(opponent)

    const scores = calculateScores(decision, opponent)
    
    const result: GameResult = {
      playerDecision: decision,
      opponentDecision: opponent,
      playerScore: scores.player,
      opponentScore: scores.opponent,
      round: currentRound,
    }

    setGameHistory([...gameHistory, result])
    setTotalPlayerScore(totalPlayerScore + scores.player)
    setTotalOpponentScore(totalOpponentScore + scores.opponent)
    setShowResult(true)

    // Set explanation
    if (decision === 'cooperate' && opponent === 'cooperate') {
      setExplanation('Both cooperated! You both get 3 points. Mutual cooperation benefits everyone.')
    } else if (decision === 'defect' && opponent === 'cooperate') {
      setExplanation('You defected while they cooperated! You get 5 points, they get 0. Short-term gain, but trust is broken.')
    } else if (decision === 'cooperate' && opponent === 'defect') {
      setExplanation('They defected while you cooperated! You get 0 points, they get 5. You were betrayed.')
    } else {
      setExplanation('Both defected! You both get only 1 point. Mutual defection hurts everyone.')
    }
  }

  const nextRound = () => {
    if (currentRound >= MAX_ROUNDS) {
      setGameOver(true)
      return
    }

    setCurrentRound(currentRound + 1)
    setPlayerDecision(null)
    setOpponentDecision(null)
    setShowResult(false)
    setExplanation('')
  }

  const resetGame = () => {
    setPlayerDecision(null)
    setOpponentDecision(null)
    setShowResult(false)
    setGameHistory([])
    setCurrentRound(1)
    setTotalPlayerScore(0)
    setTotalOpponentScore(0)
    setGameOver(false)
    setExplanation('')
  }

  const changeStrategy = (strategy: 'random' | 'always-defect' | 'tit-for-tat') => {
    setOpponentStrategy(strategy)
    resetGame()
  }

  const getStrategyDescription = (strategy: string) => {
    switch (strategy) {
      case 'always-defect':
        return 'Always defects - never cooperates'
      case 'tit-for-tat':
        return 'Starts by cooperating, then mirrors your last move'
      default:
        return 'Makes random decisions'
    }
  }

  return (
    <div className="w-full">
      {/* Strategy Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Choose Opponent Strategy:
        </label>
        <div className="flex flex-wrap gap-2">
          {(['random', 'always-defect', 'tit-for-tat'] as const).map((strategy) => (
            <motion.button
              key={strategy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeStrategy(strategy)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                opponentStrategy === strategy
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-300'
              }`}
            >
              {strategy === 'always-defect' ? 'Always Defect' : strategy === 'tit-for-tat' ? 'Tit-for-Tat' : 'Random'}
            </motion.button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-600">{getStrategyDescription(opponentStrategy)}</p>
      </div>

      {/* Payoff Matrix */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-3">Payoff Matrix (Points per round):</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <div>Both Cooperate: <strong>3 points each</strong></div>
          <div>You Defect, They Cooperate: <strong>You get 5, They get 0</strong></div>
          <div>You Cooperate, They Defect: <strong>You get 0, They get 5</strong></div>
          <div>Both Defect: <strong>1 point each</strong></div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-6 flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
        <div>
          <div className="text-sm text-gray-600">Round {currentRound} of {MAX_ROUNDS}</div>
          <div className="text-lg font-bold text-gray-900">Your Score: {totalPlayerScore}</div>
          <div className="text-sm text-gray-600">Opponent Score: {totalOpponentScore}</div>
        </div>
        {gameOver && (
          <div className="text-right">
            <div className={`text-lg font-bold ${totalPlayerScore > totalOpponentScore ? 'text-green-600' : totalPlayerScore < totalOpponentScore ? 'text-red-600' : 'text-gray-600'}`}>
              {totalPlayerScore > totalOpponentScore ? 'You Win! 🎉' : totalPlayerScore < totalOpponentScore ? 'You Lose' : 'Tie Game'}
            </div>
          </div>
        )}
      </div>

      {/* Decision Buttons */}
      {!gameOver && !showResult && (
        <div className="mb-6">
          <p className="text-center text-gray-700 font-medium mb-4">
            What do you choose?
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDecision('cooperate')}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <UserIcon className="h-5 w-5" />
              Cooperate
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDecision('defect')}
              className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <XCircleIcon className="h-5 w-5" />
              Defect
            </motion.button>
          </div>
        </div>
      )}

      {/* Result Display */}
      {showResult && !gameOver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 bg-white rounded-lg border-2 border-gray-300"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-4 rounded-lg ${playerDecision === 'cooperate' ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
              <div className="font-semibold text-gray-900 mb-1">Your Choice:</div>
              <div className="text-2xl font-bold">{playerDecision === 'cooperate' ? '🤝 Cooperate' : '💔 Defect'}</div>
              <div className="text-lg mt-2">+{gameHistory[gameHistory.length - 1]?.playerScore ?? 0} points</div>
            </div>
            <div className={`p-4 rounded-lg ${opponentDecision === 'cooperate' ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
              <div className="font-semibold text-gray-900 mb-1">Opponent&apos;s Choice:</div>
              <div className="text-2xl font-bold">{opponentDecision === 'cooperate' ? '🤝 Cooperate' : '💔 Defect'}</div>
              <div className="text-lg mt-2">+{gameHistory[gameHistory.length - 1]?.opponentScore ?? 0} points</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-800">{explanation}</p>
          </div>
          <button
            onClick={nextRound}
            className="w-full mt-4 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            {currentRound >= MAX_ROUNDS ? 'Finish Game' : 'Next Round'}
          </button>
        </motion.div>
      )}

      {/* Game History */}
      {gameHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Game History:</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {gameHistory.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg text-sm border-2 ${
                  result.playerScore > result.opponentScore
                    ? 'bg-green-50 border-green-200'
                    : result.playerScore < result.opponentScore
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Round {result.round}:</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`font-medium px-2 py-1 rounded ${
                      result.playerDecision === 'cooperate' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      You: {result.playerDecision === 'cooperate' ? '🤝' : '💔'} +{result.playerScore}
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className={`font-medium px-2 py-1 rounded ${
                      result.opponentDecision === 'cooperate' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      Them: {result.opponentDecision === 'cooperate' ? '🤝' : '💔'} +{result.opponentScore}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      {(gameOver || gameHistory.length > 0) && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetGame}
          className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Game
        </motion.button>
      )}

      {/* Educational Note */}
      {gameHistory.length >= 3 && !gameOver && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-900">
            <strong>💡 Game Theory Tip:</strong> In repeated games, cooperation often emerges naturally. Notice how your strategy evolves as you learn about your opponent!
          </p>
        </motion.div>
      )}
    </div>
  )
}

