import { PixelIcon } from './PixelIcon'
import { SocialIcon, type SocialIconName } from './SocialIcon'

const SOCIALS: { name: SocialIconName; label: string; href: string }[] = [
  { name: 'instagram', label: '@bachqle', href: 'https://www.instagram.com/bachqle/' },
  { name: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/in/baqh/' },
  { name: 'tiktok', label: '@b4chle', href: 'https://www.tiktok.com/@b4chle' },
]

const rowClass = 'flex w-fit items-center gap-3 py-1.5 font-bold underline-offset-4 hover:underline'

/** Shared by the hero and the modal. Inherits its text color from whichever it's in. */
export function ContactLinks() {
  return (
    <address translate="no" className="mt-3 not-italic">
      {/* Not Tegno: its 1, 0 and 8 read as other characters in a phone number. */}
      <a href="tel:+15714407983" className={`${rowClass} text-[1.25rem] whitespace-nowrap`}>
        <PixelIcon name="phone" size={18} />
        571-440-7983
      </a>
      {SOCIALS.map(({ name, label, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={`${rowClass} text-[0.9375rem]`}>
          <SocialIcon name={name} />
          {label}
          <PixelIcon name="arrow-up-right" size={10} />
        </a>
      ))}
      <a href="mailto:bachqle.real@gmail.com" className={`${rowClass} text-[0.875rem]`}>
        bachqle.real@gmail.com
      </a>
    </address>
  )
}
