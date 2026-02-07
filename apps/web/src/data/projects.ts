export const projects = [
  {
    title: 'ElevenFM',
    media: {
      type: 'video' as const,
      url: '/assets/elevenfm-pres.mp4'
    },
    description:
      'A functional Spotify clone connected to multiple APIs to deliver universal playlists, lyrics, videoclips, and more.',
    repo: 'https://github.com/sebastianwd/elevenfm',
    url: 'https://elevenfm.com',
    stack: ['tailwind', 'graphql', 'react', 'nextjs', 'sqlite'] as const
  },
  {
    title: 'RedditGrab',
    media: {
      type: 'video' as const,
      url: '/assets/redditgrab-pres.mp4'
    },
    description:
      'A Chrome/Firefox extension that allows you to download images and videos from Reddit in an automated way. Over 1000 downloads.',
    repo: 'https://github.com/sebastianwd/redditgrab',
    url: '',
    stack: ['react', 'wxt', 'tailwind'] as const,
    stores: {
      chrome: 'https://chromewebstore.google.com/detail/downloader-for-reddit-red/pkjhbflcnjikmfiiojcagjidbjeimkbj',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/media-downloader-redditgrab/'
    }
  }
]
