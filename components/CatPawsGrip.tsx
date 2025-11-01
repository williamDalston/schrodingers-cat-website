'use client'

import { useEffect, useRef, useState } from 'react'

interface CatPawsGripProps {
  /**
  . Elements with this class will trigger a "grip" effect when centered in viewport
   */
  grabbableClass?: string
  /**
   * Enable edge darkening shadows
   */
  enableEdgeShadows?: boolean
}

export default function CatPawsGrip({ 
  grabbableClass = 'grabbable',
  enableEdgeShadows = true 
}: CatPawsGripProps) {
  const pawLeftRef = useRef<HTMLDivElement>(null)
  const pawRightRef = useRef<HTMLDivElement>(null)
  const armLeftRef = useRef<SVGGElement>(null)
  const armRightRef = useRef<SVGGElement>(null)
  const pawGroupLeftRef = useRef<SVGGElement>(null)
  const pawGroupRightRef = useRef<SVGGElement>(null)
  const edgeLeftRef = useRef<HTMLDivElement>(null)
  const edgeRightRef = useRef<HTMLDivElement>(null)
  const rafIdRef = useRef<number>()
  
  const [reducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (reducedMotion) return

    const left = pawLeftRef.current
    const right = pawRightRef.current
    const armL = armLeftRef.current
    const armR = armRightRef.current
    const pawGroupL = pawGroupLeftRef.current
    const pawGroupR = pawGroupRightRef.current
    const edgeL = edgeLeftRef.current
    const edgeR = edgeRightRef.current

    if (!left || !right) return

    let vt = 0
    let vy = 0
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0
    let grip = 0

    // CSS variable getter helper
    const getVar = (name: string, fallback: number) => {
      if (typeof window === 'undefined') return fallback
      const value = getComputedStyle(document.documentElement).getPropertyValue(name)
      return value ? parseFloat(value) : fallback
    }

    const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
    const lerp = (a: number, b: number, x: number) => a + (b - a) * x

    // Observe grabbable elements for squeeze effect
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            grip = 1
            setTimeout(() => {
              grip = 0
            }, 350)
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    )

    // Observe all grabbable elements
    document.querySelectorAll(`.${grabbableClass}`).forEach((el) => io.observe(el))

    const tick = () => {
      if (typeof window === 'undefined') return

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const y = window.scrollY

      // Progress and velocity
      const newT = clamp(y / maxScroll, 0, 1)
      vt = lerp(vt, newT, 0.12)
      vy = lerp(vy, y - lastY, 0.2)
      lastY = y

      // Transform calculations
      const maxInset = getVar('--paw-max-inset', 44)
      const maxShadow = getVar('--paw-max-drop-shadow', 18)
      const gripSqueeze = getVar('--paw-grip-squeeze', 1.06)
      const tiltMax = getVar('--paw-tilt-max', 10)
      const edgeShadowMax = getVar('--paw-edge-shadow-max', 0.35)

      // Enhanced vertical movement (lift up and down more)
      const verticalLift = (v: number) => {
        // Create a wave-like motion: lift up at top, down in middle, up at bottom
        const wave = Math.sin(v * Math.PI * 2) * 0.5 + 0.5 // 0 to 1 wave
        return lerp(-80, 150, v) + (wave * 40 - 20) // More vertical range
      }
      
      const inward = (v: number) => lerp(0, maxInset, v)
      const yaw = clamp(vy * 0.1, -1.5, 1.5) // Slightly more responsive
      const armRoll = (v: number) => lerp(-8, 6, v)
      
      // Arm moves more with scroll, paw moves more independently
      const armVertical = verticalLift(vt)
      const pawVerticalOffset = lerp(-15, 25, vt) + (Math.sin(vt * Math.PI * 3) * 8) // Independent paw movement
      
      // Paw rotation independent from arm (for realistic "flop")
      const pawRotation = lerp(-5, 8, vt) + (grip * 10) // Paw rotates more when gripping
      const armRotation = armRoll(vt)
      
      const squeeze = lerp(1, gripSqueeze, grip)
      const shadowPx = lerp(
        8,
        maxShadow,
        clamp(vt * 0.8 + grip * 0.7, 0, 1)
      )
      const edgeAlpha = enableEdgeShadows
        ? lerp(0, edgeShadowMax, clamp(vt * 0.6 + grip * 0.9, 0, 1))
        : 0

      // Apply transforms to left container (arm movement)
      if (left) {
        left.style.transform = `translate3d(${-inward(vt)}px, ${armVertical}px, 0)
          rotateY(${clamp(-8 - yaw, -tiltMax, 0)}deg)
          rotateZ(${armRotation}deg)`
        left.style.filter = `drop-shadow(0 ${shadowPx}px ${shadowPx * 0.7}px rgba(0,0,0,.15))`
      }
      
      // Apply independent transform to left arm group
      if (armL) {
        const armTilt = lerp(0, 5, vt)
        armL.style.transform = `rotate(${armTilt}deg)`
      }
      
      // Apply independent transform to left paw group (more movement)
      if (pawGroupL) {
        const pawX = Math.sin(vt * Math.PI * 2) * 3 // Side-to-side wobble
        pawGroupL.style.transform = `translate(${pawX}px, ${pawVerticalOffset}px) rotate(${pawRotation}deg) scale(${squeeze})`
      }

      // Apply transforms to right container (mirrored)
      if (right) {
        right.style.transform = `translate3d(${inward(vt)}px, ${armVertical}px, 0)
          rotateY(${clamp(8 + yaw, 0, tiltMax)}deg)
          rotateZ(${-armRotation}deg)
          scaleX(-1)`
        right.style.filter = `drop-shadow(0 ${shadowPx}px ${shadowPx * 0.7}px rgba(0,0,0,.15))`
      }
      
      // Apply independent transform to right arm group
      if (armR) {
        const armTilt = lerp(0, -5, vt)
        armR.style.transform = `rotate(${armTilt}deg) scaleX(-1)`
      }
      
      // Apply independent transform to right paw group
      if (pawGroupR) {
        const pawX = Math.sin(vt * Math.PI * 2) * -3 // Opposite side-to-side wobble
        pawGroupR.style.transform = `translate(${pawX}px, ${pawVerticalOffset}px) rotate(${-pawRotation}deg) scaleX(-1) scale(${squeeze})`
      }

      // Edge shadows
      if (edgeL && enableEdgeShadows) {
        edgeL.style.setProperty('--edge-shadow', edgeAlpha.toFixed(3))
      }
      if (edgeR && enableEdgeShadows) {
        edgeR.style.setProperty('--edge-shadow', edgeAlpha.toFixed(3))
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      io.disconnect()
    }
  }, [reducedMotion, grabbableClass, enableEdgeShadows])

  // Don't render if reduced motion is preferred
  if (reducedMotion) return null

  return (
    <>
      {/* Edge darkening shadows */}
      {enableEdgeShadows && (
        <>
          <div
            ref={edgeLeftRef}
            className="edge-shadow left"
            style={{ '--edge-shadow': '0' } as React.CSSProperties}
            aria-hidden="true"
          />
          <div
            ref={edgeRightRef}
            className="edge-shadow right"
            style={{ '--edge-shadow': '0' } as React.CSSProperties}
            aria-hidden="true"
          />
        </>
      )}

      {/* Paws container */}
      <div className="paws" aria-hidden="true">
        {/* Left paw */}
        <div ref={pawLeftRef} className="paw left" id="pawLeft">
          <svg viewBox="0 0 350 420" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="furL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4c5b5" />
                <stop offset="100%" stopColor="#c4b5a6" />
              </linearGradient>
            </defs>
            {/* Arm - separate group for independent movement */}
            <g ref={armLeftRef} transform-origin="175 185">
              <path
                d="M110 0 C60 110, 60 250, 120 370 L230 370 C260 260, 260 130, 220 0 Z"
                fill="url(#furL)"
                opacity="0.4"
              />
            </g>
            {/* Paw - separate group for independent movement */}
            <g ref={pawGroupLeftRef} transform-origin="175 340">
              {/* Paw palm */}
              <ellipse
                cx="175"
                cy="340"
                rx="70"
                ry="54"
                fill="#f4ede7"
                stroke="#a89b8f"
                strokeWidth="3"
                opacity="0.4"
              />
              {/* Pads - using theme colors */}
              <ellipse cx="175" cy="350" rx="46" ry="36" fill="#22c55e" opacity="0.3" />
              <circle cx="140" cy="310" r="16" fill="#f59e0b" opacity="0.35" />
              <circle cx="210" cy="310" r="16" fill="#f59e0b" opacity="0.35" />
              <circle cx="155" cy="295" r="12" fill="#2563eb" opacity="0.3" />
              <circle cx="195" cy="295" r="12" fill="#2563eb" opacity="0.3" />
              {/* Claws */}
              <path
                d="M120 355 l-8 16"
                stroke="#8b7d6f"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
              />
              <path
                d="M230 355 l8 16"
                stroke="#8b7d6f"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
              />
            </g>
          </svg>
        </div>

        {/* Right paw */}
        <div ref={pawRightRef} className="paw right" id="pawRight">
          <svg viewBox="0 0 350 420" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="furR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4c5b5" />
                <stop offset="100%" stopColor="#c4b5a6" />
              </linearGradient>
            </defs>
            {/* Arm - separate group for independent movement */}
            <g ref={armRightRef} transform-origin="175 185">
              <path
                d="M110 0 C60 110, 60 250, 120 370 L230 370 C260 260, 260 130, 220 0 Z"
                fill="url(#furR)"
                opacity="0.4"
              />
            </g>
            {/* Paw - separate group for independent movement */}
            <g ref={pawGroupRightRef} transform-origin="175 340">
              <ellipse
                cx="175"
                cy="340"
                rx="70"
                ry="54"
                fill="#f4ede7"
                stroke="#a89b8f"
                strokeWidth="3"
                opacity="0.4"
              />
              <ellipse cx="175" cy="350" rx="46" ry="36" fill="#22c55e" opacity="0.3" />
              <circle cx="140" cy="310" r="16" fill="#f59e0b" opacity="0.35" />
              <circle cx="210" cy="310" r="16" fill="#f59e0b" opacity="0.35" />
              <circle cx="155" cy="295" r="12" fill="#2563eb" opacity="0.3" />
              <circle cx="195" cy="295" r="12" fill="#2563eb" opacity="0.3" />
              <path
                d="M120 355 l-8 16"
                stroke="#8b7d6f"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
              />
              <path
                d="M230 355 l8 16"
                stroke="#8b7d6f"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}

