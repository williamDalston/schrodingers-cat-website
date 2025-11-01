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
  const [showExplanation, setShowExplanation] = useState(false)

  const startNewGame = () => {
    // Randomly place the car behind one of three doors
    const car = Math.floor(Math.random() * 3) + 1
    setCarDoor(car)
    setSelectedDoor(null)
    setHostOpens(null)
    setStage('choose')
    setHasSwitched(false)
    setResult(null)
    setShowExplanation(false)
  }

  const selectDoor = (door: number) => {
    if (stage !== 'choose' || !carDoor) return
    setSelectedDoor(door)
    setStage('host-reveals')
    
    // Host opens a door with a goat (not the selected door, not the car)
    let hostDoor: number
    do {
      hostDoor = Math.floor(Math.random() * 3) + 1
    } while (hostDoor === door || hostDoor === carDoor)
    
    // Delay the reveal for dramatic effect
    setTimeout(() => {
      setHostOpens(hostDoor)
      setStage('switch-or-stay')
    }, 800)
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
      if (stage === 'final') {
        bgColor = result === 'win' && carDoor === number ? 'bg-green-100' : result === 'lose' && carDoor !== number ? 'bg-red-100' : 'bg-blue-100'
        borderColor = result === 'win' && carDoor === number ? 'border-green-500 border-4' : 'border-blue-500 border-4'
      } else {
        bgColor = 'bg-blue-100'
        borderColor = 'border-blue-500 border-4'
      }
    }
    
    if (isHostOpen && stage === 'switch-or-stay') {
      bgColor = 'bg-gray-300'
      borderColor = 'border-gray-500 border-2'
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-tertiary-50 rounded-lg border-2 border-primary-200 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div className="p-3 bg-white rounded-lg border-2 border-green-300">
              <div className="font-bold text-gray-900 mb-1">Switch Strategy</div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.switchTotal > 0 ? Math.round((stats.switchWins / stats.switchTotal) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">
                {stats.switchWins} / {stats.switchTotal} wins
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
              <div className="font-bold text-gray-900 mb-1">Stay Strategy</div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {stats.stayTotal > 0 ? Math.round((stats.stayWins / stats.stayTotal) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">
                {stats.stayWins} / {stats.stayTotal} wins
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              Total games: <span className="font-bold">{stats.games}</span>
            </div>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium underline"
            >
              {showExplanation ? 'Hide' : 'Show'} Why Switching Works
            </button>
          </div>
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-white rounded-lg border border-primary-200"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Why switching wins ~67% of the time:</strong> When you first choose, you have a 1/3 chance of being correct. 
                When the host reveals a goat behind another door, switching gives you the remaining door, which has a 2/3 chance of 
                having the car (because the host never reveals the car). The switch strategy essentially gives you both doors you didn&apos;t 
                initially pick!
              </p>
            </motion.div>
          )}
        </motion.div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-lg text-gray-700 font-medium mb-2">
              Choose a door! Behind one is a car 🚗, behind the others are goats 🐐.
            </p>
            <p className="text-sm text-gray-500">
              Click on any door to begin
            </p>
          </motion.div>
        )}
        {stage === 'host-reveals' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-gray-700 font-medium mb-2">
              The host is revealing what&apos;s behind one of the other doors...
            </p>
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          </motion.div>
        )}
        {stage === 'switch-or-stay' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <p className="text-gray-700 font-medium">
              The host revealed a goat behind door {hostOpens}. You initially chose door {selectedDoor}.
            </p>
            <p className="text-xl font-bold text-gray-900">
              Do you want to switch to the other door, or stay with your original choice?
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => makeDecision(true)}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Switch Doors
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => makeDecision(false)}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Stay
              </motion.button>
            </div>
          </motion.div>
        )}
        {stage === 'final' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <AnimatePresence mode="wait">
              {result === 'win' ? (
                <motion.div
                  key="win"
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex flex-col items-center gap-3 px-8 py-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <TrophyIcon className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <span className="text-green-900 font-bold text-xl">You Won! 🎉</span>
                </motion.div>
              ) : (
                <motion.div
                  key="lose"
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex flex-col items-center gap-3 px-8 py-6 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-500 rounded-xl shadow-lg"
                >
                  <XCircleIcon className="h-8 w-8 text-red-600" />
                  <span className="text-red-900 font-bold text-xl">You Got a Goat 😢</span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 text-lg"
            >
              You {hasSwitched ? 'switched' : 'stayed'} and {result === 'win' ? 'won' : 'lost'}.
            </motion.p>
            {(hasSwitched && result === 'win') && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-green-700 font-semibold"
              >
                ✨ The switch strategy paid off! Keep switching to see why it works ~67% of the time.
              </motion.p>
            )}
            {(!hasSwitched && result === 'lose') && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-orange-700 font-semibold"
              >
                💡 Tip: Try switching next time! Statistically, switching gives you a better chance.
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewGame}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

