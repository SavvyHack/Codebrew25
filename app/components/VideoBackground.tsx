"use client"

import { useState, useEffect, useRef } from "react"

const videos = ["/background/video1.mp4", "/background/video2.mp4", "/background/video3.mp4"]

export default function VideoBackground() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }

    videoRef.current.addEventListener("ended", handleVideoEnd)

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd)
      }
    }
  }, [])

  return (
    <>
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <video ref={videoRef} src={videos[currentVideoIndex]} autoPlay muted playsInline className="video-background" />
    </>
  )
}
