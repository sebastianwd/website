import { Link } from '@tanstack/react-router'

import { CyberBorder1 } from './graphics'
import { PageViews } from './page-views'
import { SpotifyActivity } from './spotify-activity'

export function Footer() {
  return (
    <footer className='mt-auto py-8'>
      <CyberBorder1 className='mb-12 size-full rotate-180' />
      <div className='container mx-auto px-6 lg:max-w-5xl'>
        <div className='flex flex-col gap-7 md:flex-row md:items-start md:justify-between md:gap-2'>
          {/* Spotify - Left */}
          <SpotifyActivity className='basis-1/3 justify-center md:justify-start' />

          {/* Center */}
          <div className='basis-1/3 text-center text-sm text-zinc-400'>
            Built by{' '}
            <a
              href='https://github.com/sebastianwd'
              target='_blank'
              rel='noopener noreferrer'
              className='text-zinc-300 hover:underline'
            >
              @sebastianwd
            </a>
            {' | '}
            <a
              href='https://github.com/sebastianwd/website'
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent hover:underline'
            >
              Source code
            </a>
          </div>

          {/* Right */}
          <div className='flex basis-1/3 justify-center gap-12 md:justify-end'>
            <nav className='flex flex-col gap-1 text-sm'>
              <Link to='/' className='text-zinc-200 hover:text-zinc-200'>
                Home
              </Link>
            </nav>
            <PageViews slug='/' />
          </div>
        </div>
      </div>
    </footer>
  )
}
