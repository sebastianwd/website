import { createServerFn } from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'
import * as cheerio from 'cheerio'

interface SpotifyData {
  artist: string
  song: string
  coverImg: string
  isPlaying: boolean
}

function extractSpotifyData(html: string): SpotifyData {
  const $ = cheerio.load(html)
  const artist = $('.artist').text()
  const song = $('.song').text()
  const coverImg = $('.cover').attr('src') || ''
  const playing = $('.playing').text()

  return {
    artist,
    song,
    coverImg,
    isPlaying: playing.includes('Now playing on')
  }
}

export const getSpotifyActivity = createServerFn({ method: 'GET' }).handler(async () => {
  const spotifyUrl = process.env.SPOTIFY_URL

  if (!spotifyUrl) {
    throw new Error('Missing SPOTIFY_URL environment variable')
  }

  setResponseHeaders(
    new Headers({
      'Cache-Control': 'public, max-age=60',
      'CDN-Cache-Control': 'max-age=120, stale-while-revalidate=60'
    })
  )

  const response = await fetch(spotifyUrl)
  const html = await response.text()

  return extractSpotifyData(html)
})
