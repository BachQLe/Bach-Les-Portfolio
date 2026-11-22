import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { VideoSections } from './components/VideoSections'
import { WhyMe } from './components/WhyMe'
import { DarkCTA } from './components/DarkCTA'
import { ContactModal } from './components/ContactModal'

export default function App() {
  const [open, setOpen] = useState(false)
  // Whichever button was clicked, so focus returns to it when the modal closes.
  const triggerRef = useRef<HTMLButtonElement>(null)

  function handleOpenContact(event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget
    setOpen(true)
  }

  return (
    <>
      <Navbar onOpenContact={handleOpenContact} />
      <main className="[&>*+*]:border-t [&>*+*]:border-rule">
        <Hero />
        <About />
        <VideoSections />
        <WhyMe />
      </main>
      <DarkCTA onOpenContact={handleOpenContact} />
      <ContactModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  )
}
