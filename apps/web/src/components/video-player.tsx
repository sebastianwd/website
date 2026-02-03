import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  src: string
  className?: string
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.load()
    }
  }, [src])

  return <video ref={videoRef} className={className} src={src} muted playsInline loop autoPlay preload='auto' />
}
