'use client'
import React, { useEffect, useState, useRef } from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer'

export default function AudioBackground(props) {
  var audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const container = window.document.getElementById('audio-container')
      const audioSource = window.document.getElementById('background_audio')
      const audioMotion = new AudioMotionAnalyzer(container, {
        source: audioSource,
        height: 200,
        ansiBands: false,
        showScaleX: false,
        bgAlpha: 0,
        overlay: true,
        smoothing: 0.7,
        mode: 0,
        barSpace: 0.1,
        channelLayout: 'single',
        ledBars: false,
        mirror: 0,
        radial: true,
        showPeaks: true,
        spinSpeed: 5,
        colorMode: 'gradient',
        gradient: 'rainbow',
      })

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
      <div id='audio-container'></div>
      <div
        onClick={playBackground}
        style={{
          position: 'absolute',
          bottom: 55,
          right: 72,
          zIndex: 999,
          cursor: 'pointer',
        }}
      >
        <i
          className={isPlaying ? 'bi bi-volume-up' : 'bi bi-volume-mute'}
          style={{ color: 'white', fontSize: 32 }}
        ></i>
      </div>

      <audio
        ref={audioRef}
        id='background_audio'
        volume={0.2}
        loop
        crossOrigin='anonymous'
      >
        <source src='/music/OneStepCloser.mp3' type='audio/mpeg' />
      </audio>
    </div>
  )
}
