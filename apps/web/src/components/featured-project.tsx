import { Icon } from '@iconify/react'
import { Button } from '@repo/ui/components/button'
import type { HTMLAttributes } from 'react'

import { Surface } from '~/components/surface'
import { Tooltip } from '~/components/tooltip'

import { ProjectCard } from '../components/project-card'

const iconComponents = {
  tailwind: {
    icon: 'simple-icons:tailwindcss',
    title: 'TailwindCSS'
  },
  react: {
    icon: 'simple-icons:react',
    title: 'React.js'
  },
  graphql: {
    icon: 'simple-icons:graphql',
    title: 'GraphQL'
  },
  nextjs: {
    icon: 'devicon-plain:nextjs',
    title: 'Next.js'
  },
  sqlite: {
    icon: 'simple-icons:sqlite',
    title: 'SQLite'
  },
  python: {
    icon: 'devicon-plain:python',
    title: 'Python'
  },
  docker: {
    icon: 'simple-icons:docker',
    title: 'Docker'
  },
  jupyter: {
    icon: 'devicon-plain:jupyter-wordmark',
    title: 'Jupyter'
  },
  ['react-native']: {
    icon: 'simple-icons:react',
    title: 'React Native'
  },
  wxt: {
    icon: 'simple-icons:wxt',
    title: 'WXT'
  }
} as const

interface Props extends HTMLAttributes<'div'> {
  title: string
  description: string
  stack: Readonly<(keyof typeof iconComponents)[]>
  media: {
    type: 'image' | 'video'
    url: string
  }
  url?: string
  orientation?: 'left' | 'right'
  repo?: string
  stores?: {
    chrome?: string
    firefox?: string
  }
}

export const FeaturedProject = (props: Props) => {
  const { title, description, stack, media, orientation = 'right', url, repo, stores } = props

  return (
    <div className='flex flex-col flex-wrap md:flex-row md:flex-nowrap md:gap-5'>
      {orientation === 'left' ? (
        <Surface className='flex shrink-0 grow basis-full items-center overflow-hidden p-4 md:basis-2/5'>
          <ProjectCard title={title} media={media} href={repo} className='w-full' />
        </Surface>
      ) : null}
      <div className='rounded-lg border border-dashed border-neutral-700/75 px-5 py-6'>
        <h3 className='mb-2 font-clvtc text-2xl text-accent'>{title}</h3>
        <p className='mb-3 text-sm'>{description}</p>
        <div className='mb-7 flex'>
          <p className='mr-2 flex items-center text-sm'>
            <span className='text-gray-300'>Stack: </span>
          </p>
          {stack.map((key) => (
            <Tooltip text={iconComponents[key].title} className='size-fit px-1' key={key}>
              <Icon className='inline-block size-5 shrink-0' icon={iconComponents[key].icon} />
            </Tooltip>
          ))}
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          {url ? (
            <a href={url} target='_blank' rel='noopener noreferrer'>
              <Button variant='secondary'>
                View live site
                <Icon icon='radix-icons:external-link' className='ml-1 size-4' />
              </Button>
            </a>
          ) : null}
          {stores?.chrome ? (
            <a href={stores.chrome} target='_blank' rel='noopener noreferrer'>
              <Button variant='secondary'>
                Chrome
                <Icon icon='simple-icons:googlechrome' className='size-4' />
              </Button>
            </a>
          ) : null}
          {stores?.firefox ? (
            <a href={stores.firefox} target='_blank' rel='noopener noreferrer'>
              <Button variant='secondary'>
                Firefox
                <Icon icon='simple-icons:firefox' className='size-4' />
              </Button>
            </a>
          ) : null}
          {repo ? (
            <a
              href={repo}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-auto flex items-center text-xs underline-offset-2 hover:underline'
            >
              <Icon icon='simple-icons:github' className='mr-1 inline-block size-4' />
              Repository
            </a>
          ) : null}
        </div>
      </div>
      {orientation === 'right' ? (
        <Surface className='order-first flex shrink-0 grow basis-full items-center overflow-hidden p-4 md:order-last md:basis-2/5'>
          <ProjectCard title={title} media={media} href={repo} className='w-full' />
        </Surface>
      ) : null}
    </div>
  )
}
