import { Icon, loadIcons } from '@iconify/react'
import { orpc } from '@repo/api/lib/orpc.client'
import { buttonVariants } from '@repo/ui/components/button'
import { cn } from '@repo/ui/utils/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useMemo } from 'react'

import { BackgroundPattern } from '~/components/background-pattern'
import { FeaturedProject } from '~/components/featured-project'
import { LandingLogo } from '~/components/graphics'
import { Surface } from '~/components/surface'
import { WordAnimator } from '~/components/word-animator'
import { projects } from '~/data/projects'

loadIcons(['mdi:linkedin', 'mdi:github', 'mdi:email', 'mdi:open-in-new'])

const SOCIALS = {
  linkedin: 'aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3NlYmFzdGlhbi1sdXF1ZS04OTFiOTAxODUv',
  github: 'aHR0cHM6Ly9naXRodWIuY29tL3NlYmFzdGlhbndk',
  email: 'bWFpbHRvOnNlYmFzdGlhbi5sdXF1ZUBwcm90b25tYWlsLmNvbQ=='
}

const experienceData = [
  {
    company: 'Q1BJIENhcmQgR3JvdXA=',
    description: 'RnJvbnRlbmQgYXJjaGl0ZWN0dXJlIGZvciB0aGUgY2FyZCBpc3N1ZXIgcGxhdGZvcm0u',
    year: 'MjAyNQ=='
  },
  {
    company: 'UmlwIFRlY2hub2xvZ2llcw==',
    description: 'TGFuZGluZyBwYWdlcywgQVBJIGludGVncmF0aW9ucywgZGVzaWduIHN5c3RlbXMgYW5kIG90aGVyIGNvb2wgc3R1ZmYu',
    year: 'MjAyNQ=='
  },
  {
    company: 'SGFud2hhIFZpc2lvbg==',
    description: 'RnJvbnRlbmQgYXJjaGl0ZWN0dXJlIGZvciB0aGUgQUkgcmVjb2duaXRpb24gdmlkZW8gcGxhdGZvcm0u',
    year: 'MjAyMw=='
  },
  {
    company: 'UmlxcmE=',
    description: 'TW9iaWxlIGFuZCB3ZWIgZGV2ZWxvcG1lbnQgb2YgQjJCIGUtY29tbWVyY2Uu',
    year: 'MjAyMA=='
  },
  {
    company: 'UCZT',
    description: 'RGF0YWJhc2VzLCAuTkVULg==',
    year: 'MjAxOA=='
  }
]

export const Route = createFileRoute('/')({
  component: App,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.orpc.example.queryOptions())
  }
})

function TechItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className='flex items-center gap-3'>
      <img src={icon} alt={label} className='size-8 shrink-0' />
      <span className='text-base text-zinc-300'>{label}</span>
    </div>
  )
}

function App() {
  useSuspenseQuery(orpc.example.queryOptions())
  const experience = experienceData.map((e) => ({
    company: atob(e.company),
    description: atob(e.description),
    year: atob(e.year)
  }))

  return (
    <div className='relative overflow-hidden'>
      <section className='container mx-auto px-6 pt-10 pb-20 lg:max-w-5xl'>
        <BackgroundPattern />
        <div className='mb-12'>
          <div className='flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex flex-1 flex-col gap-5'>
              <h1 className='font-clvtc text-4xl'>Full Stack developer & Frontend specialist</h1>
              <p className='text-zinc-300'>
                I&apos;m Sebastian, a Systems Engineer with 8 years of experience in web development. Based in Peru,
                I&apos;ve spent most of my career working remotely with international teams. My expertise lies in
                frontend architecture, component libraries, and design systems.
              </p>
              <div className='flex h-8 gap-4'>
                {[
                  { href: atob(SOCIALS.linkedin), icon: 'mdi:linkedin', label: 'LinkedIn' },
                  { href: atob(SOCIALS.github), icon: 'mdi:github', label: 'GitHub' },
                  { href: atob(SOCIALS.email), icon: 'mdi:email', label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.2, ease: 'easeOut' }}
                  >
                    <Icon icon={social.icon} className='size-8 text-accent' />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-center lg:flex-1'>
              <LandingLogo className='-my-16 size-full max-h-[300px] lg:max-h-full' />
            </div>
          </div>
        </div>
        <div>
          <Surface className='flex flex-wrap items-center justify-center gap-6 px-6 py-4 lg:justify-between'>
            {[
              { icon: '/assets/react.svg', label: 'React' },
              { icon: '/assets/typescript.svg', label: 'TypeScript' },
              { icon: '/assets/next.svg', label: 'Next.js' },
              { icon: '/assets/tanstack.svg', label: 'TanStack' },
              { icon: '/assets/tailwind.svg', label: 'TailwindCSS' },
              { icon: '/assets/pnpm.svg', label: 'PNPM' },
              { icon: '/assets/cursor.svg', label: 'Cursor' }
            ].map(({ icon, label }) => (
              <TechItem key={label} icon={icon} label={label} />
            ))}
          </Surface>
        </div>

        <div className='mt-16'>
          <WordAnimator
            tag='h2'
            words='Experience'
            className='mb-6 h-9 font-clvtc text-3xl tracking-wider text-accent'
          />
          <div className='flex flex-col gap-6'>
            {experience.map(({ company, description, year }) => (
              <div key={company} className='flex items-center gap-4'>
                <div className='flex-1'>
                  <h3 className='font-medium'>{company}</h3>
                  <p className='text-sm text-zinc-400'>{description}</p>
                </div>
                <div className='h-px max-w-20 flex-1 bg-zinc-700' />
                <span className='text-zinc-400'>{year}</span>
              </div>
            ))}
          </div>
          <div className='mt-8 flex justify-center'>
            <a
              href={atob(SOCIALS.linkedin)}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'shiny' }), 'rounded-xl')}
            >
              View full resume
              <Icon icon='mdi:open-in-new' className='size-4' />
            </a>
          </div>
        </div>

        <div className='mt-16'>
          <div className='mb-2 flex h-9 font-clvtc text-3xl tracking-wider'>
            <h2 className='font-clvtc text-3xl tracking-wider'>Side&nbsp;</h2>
            <WordAnimator tag='span' words='Projects' className='text-accent' delay={60} />
          </div>
          <p className='mb-8 text-zinc-400'>Some personal side-projects that I&apos;ve worked on.</p>

          <div className='flex flex-col gap-8'>
            {projects.map((project, index) => (
              <FeaturedProject
                key={project.title + index}
                title={project.title}
                description={project.description}
                stack={project.stack}
                media={project.media}
                url={project.url || undefined}
                repo={project.repo}
                orientation={index % 2 === 0 ? 'right' : 'left'}
                stores={project.stores}
              />
            ))}
          </div>

          <div className='mt-8 flex justify-center'>
            <a
              href={atob(SOCIALS.github)}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'shiny' }), 'rounded-xl')}
            >
              See more on GitHub
              <Icon icon='mdi:open-in-new' className='size-4' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
