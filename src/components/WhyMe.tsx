import { Section, SectionTitle } from './Section'

export function WhyMe() {
  return (
    <Section tone="canvas">
      <SectionTitle icon="heart">why me</SectionTitle>
      <div className="mt-4 max-w-2xl space-y-4 text-[1.125rem] leading-[1.75] text-pretty text-ink">
        <p>
          I’m obsessed with the work I produce, and I’m always trying to make it better.
        </p>
        <p>
          I learn from every opportunity. I’m adaptable, I listen to feedback, and try to improve myself on every video!
        </p>
        <p>I try to bring out personality into my videos and focus on relatability</p>
      </div>
    </Section>
  )
}
