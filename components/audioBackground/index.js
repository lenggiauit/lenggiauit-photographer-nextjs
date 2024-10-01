'use client'
import React, { useEffect, useState, useRef } from 'react'

export default function AudioBackground(props) {
  var audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', function () {
        //autoplay()
      })
    }
  }, [])

  const autoplay = () => {
    const audio = audioRef.current
    if (typeof window !== 'undefined') {
      if (!isAutoPlay) {
        audio?.play()
        setIsAutoPlay(true)
        setIsPlaying(true)
      }
    }
  }

  const playBackground = () => {
    const audio = audioRef.current
    if (typeof window !== 'undefined') {
      if (!isPlaying) {
        setIsPlaying(true)
        audio?.play()
      } else {
        audio?.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div>
      <div
        onClick={playBackground}
        style={{
          position: 'absolute',
          bottom: 56,
          right: 40,
          zIndex: 999,
          cursor: 'pointer',
        }}
      >
        <i
          className={isPlaying ? 'bi bi-volume-up' : 'bi bi-volume-mute'}
          style={{ color: 'white', fontSize: 32 }}
        ></i>
      </div>

      <audio ref={audioRef} id='background_audio' volume={0.2} loop>
        <source src='/music/OneStepCloser.mp3' type='audio/mpeg' />
      </audio>
    </div>
  )
}
