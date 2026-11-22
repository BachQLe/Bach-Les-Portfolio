import { Section, SectionTitle } from './Section'
import { ColorSlab } from './deco/ColorSlab'

const linkClass = 'underline decoration-green decoration-2 underline-offset-4 hover:bg-green-wash'

export function About() {
  return (
    <Section tone="surface">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <SectionTitle icon="star">about me</SectionTitle>
          <p className="mt-4 text-[1.125rem] leading-[1.75] text-pretty text-ink">
            I’m a UVA student who shoots and edits videos. I’m a multimedia producer at{' '}
            <a href="https://instagram.com/wahoops_" target="_blank" rel="noopener noreferrer" className={linkClass}>
              @wahoops_
            </a>
            , freelance for food blogger{' '}
            <a href="https://instagram.com/urnovafoodie" target="_blank" rel="noopener noreferrer" className={linkClass}>
              @urnovafoodie
            </a>
            , and make cooking videos for fun.
          </p>
        </div>

        <div className="relative isolate w-48 shrink-0 self-center sm:mr-6">
          <div className="absolute -inset-x-2 top-8 -bottom-6 -z-10">
            <ColorSlab
              seed="about-polaroid"
              color="bg-pop-violet"
              image="/images/texture-deco.jpg"
              rotate={2}
              className="h-full w-full"
            />
          </div>
          <figure className="paper rotate-[-4deg] p-3 pb-8 transition-transform duration-300 ease-out hover:rotate-[-1deg]">
            <img
              src="/images/park-selfie.jpg"
              alt="Bach on a walking trail, making a face at the camera"
              width={500}
              height={500}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </Section>
  )
}
