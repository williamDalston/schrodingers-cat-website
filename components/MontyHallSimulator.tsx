'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrophyIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function MontyHallSimulator() {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null)
  const [hostOpens, setHostOpens] = useState<number | null>(null)
  const [carDoor, setCarDoor] = useState<number | null>(null)
  const [stage, setStage] = useState<'choose' | 'host-reveals' | 'switch-or-stay' | 'final'>('choose')
  const [hasSwitched, setHasSwitched] = useState<boolean>(false)
  const [result, setResult] = useState<'win' | 'lose' | null>(null)
  const [stats, setStats] = useState({ games: 0, switchWins: 0, stayWins: 0, switchTotal: 0, stayTotal: 0 })

  const startNewGame = () => {
    // Randomly place the car behind one of three doors
    const car = Math.floor(Math.random() * 3) + 1
    setCarDoor(car)
    setSelectedDoor(null)
    setHostOpens(null)
    setStage('choose')
    setHasSwitched(false)
    setResult(null)
  }

  const selectDoor = (door: number) => {
    if (stage !== 'choose') return
    setSelectedDoor(door)
    
    // Host opens a door with a goat (not the selected door, not the car)
    let hostDoor: number
    do {
      hostDoor = Math.floor(Math.random() * 3) + 1
    } while (hostDoor === door || hostDoor === carDoor)
    
    setHostOpens(hostDoor)
    setStage('switch-or-stay')
  }

  const makeDecision = (switchDoor: boolean) => {
    if (stage !== 'switch-or-stay') return
    
    setHasSwitched(switchDoor)
    let finalDoor = selectedDoor!
    
    if (switchDoor) {
      // Switch to the remaining door
      const remainingDoors = [1, 2, 3].filter(d => d !== selectedDoor && d !== hostOpens)
      const switchedDoor = remainingDoors[0]
      if (switchedDoor !== undefined) {
        finalDoor = switchedDoor
        setSelectedDoor(finalDoor)
      }
    }
    
    setStage('final')
    const won = finalDoor === carDoor
    setResult(won ? 'win' : 'lose')
    
    // Update stats
    const newStats = { ...stats, games: stats.games + 1 }
    if (switchDoor) {
      newStats.switchTotal++
      if (won) newStats.switchWins++
    } else {
      newStats.stayTotal++
      if (won) newStats.stayWins++
    }
    setStats(newStats)
  }

  useEffect(() => {
    startNewGame()
  }, [])

  const Door = ({ number }: { number: number }) => {
    const isSelected = selectedDoor === number
    const isHostOpen = hostOpens === number
    const showCar = stage === 'final' && carDoor === number
    const showGoat = stage === 'final' && carDoor !== number
    
    let bgColor = 'bg-gray-100'
    let borderColor = 'border-gray-300'
    
    if (isSelected) {
      bgColor = stage === 'final' && result === 'win' ? 'bg-green-100' : stage === 'final' && result === 'lose' ? 'bg-red-100' : 'bg-blue-100'
      borderColor = 'border-blue-500 border-4'
    }
    
    if (isHostOpen && stage !== 'final') {
      bgColor = 'bg-gray-200'
    }

    return (
      <motion.button
        onClick={() => selectDoor(number)}
        disabled={stage !== 'choose'}
        className={`relative w-32 h-48 ${bgColor} ${borderColor} border-2 rounded-lg flex flex-col items-center justify-center transition-all disabled:cursor-not-allowed`}
        whileHover={stage === 'choose' ? { scale: 1.05 } : {}}
        whileTap={stage === 'choose' ? { scale: 0.95 } : {}}
      >
        {isHostOpen && stage !== 'final' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 rounded-lg">
            <span className="text-6xl">🐐</span>
          </div>
        )}
        {showGoat && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🐐</span>
          </div>
        )}
        {showCar && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🚗</span>
          </div>
        )}
        {!isHostOpen && !showCar && !showGoat && (
          <div className="text-4xl font-bold text-gray-400">{number}</div>
        )}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
        )}
      </motion.button>
    )
  }

  return (
    <div className="w-full">
      {/* Stats Bar */}
      {stats.games > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-gray-700">Switch Strategy</div>
              <div className="text-gray-600">
                {stats.switchWins} / {stats.switchTotal} wins ({stats.switchTotal > 0 ? Math.round((stats.switchWins / stats.switchTotal) * 100) : 0}%)
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Stay Strategy</div>
              <div className="text-gray-600">
                {stats.stayWins} / {stats.stayTotal} wins ({stats.stayTotal > 0 ? Math.round((stats.stayWins / stats.stayTotal) * 100) : 0}%)
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Total games: {stats.games}
          </div>
        </div>
      )}

      {/* Doors */}
      <div className="flex justify-center gap-4 mb-8">
        <Door number={1} />
        <Door number={2} />
        <Door number={3} />
      </div>

      {/* Instructions */}
      <div className="mb-6">
        {stage === 'choose' && (
          <p className="text-center text-gray-700 font-medium">
            Choose a door! Behind one is a car, behind the others are goats.
          </p>
        )}
        {stage === 'switch-or-stay' && (
          <div className="text-center space-y-4">
            <p className="text-gray-700 font-medium">
              The host has revealed a goat behind door {hostOpens}. You chose door {selectedDoor}.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Do you want to switch to the other door, or stay with your original choice?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => makeDecision(true)}
                className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Switch
              </button>
              <button
                onClick={() => makeDecision(false)}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Stay
              </button>
            </div>
          </div>
        )}
        {stage === 'final' && (
          <div className="text-center space-y-4">
            <AnimatePresence>
              {result === 'win' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 border-2 border-green-500 rounded-lg"
                >
                  <TrophyIcon className="h-6 w-6 text-green-600" />
                  <span className="text-green-900 font-bold text-lg">You won! 🎉</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-100 border-2 border-red-500 rounded-lg"
                >
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                  <span className="text-red-900 font-bold text-lg">You got a goat 😢</span>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-gray-700">
              You {hasSwitched ? 'switched' : 'stayed'} and {result === 'win' ? 'won' : 'lost'}.
              {hasSwitched && result === 'win' && ' The switch strategy paid off!'}
              {!hasSwitched && result === 'lose' && ' Try switching next time!'}
            </p>
            <button
              onClick={startNewGame}
              className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

