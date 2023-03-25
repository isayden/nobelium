import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    className="fill-current text-black dark:text-white"
                  />
                  <rect width="24" height="24" fill="url(#paint0_radial)" />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(45) scale(39.598)"
                    >
                      <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#334553" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg> */}

                  {/* <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M102.282 87.5128C84.385 102.427 66.8743 109.829 49.7503 109.719C32.6263 109.608 19.4242 102.151 10.1441 87.3471C0.863999 72.5431 -1.78746 53.2095 2.18973 29.3464C6.16692 5.48324 20.3633 -3.68639 44.7788 1.83748C69.1943 7.36136 89.3565 19.2929 105.265 37.6322C121.174 55.9715 120.18 72.5983 102.282 87.5128Z" fill="url(#paint0_linear)"/>
                  <defs>
                  <linearGradient id="paint0_linear" x1="0.399994" y1="0.279999" x2="0.399994" y2="109.72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF5F6D"/>
                  <stop offset="1" stopColor="#FFC371"/>
                  </linearGradient>
                  </defs>
                  </svg> */}

                  <svg width="26px" height="24px" viewBox="0 0 26 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient x1="6.9849193E-10" y1="-3.282912E-08" x2="6.9849193E-10" y2="0.9999981" id="gradient_1">
                        <stop offset="0%" stopColor="#FF5F6D" />
                        <stop offset="100%" stopColor="#FFC371" />
                      </linearGradient>
                      <path d="M0 0L25.5273 0L25.5273 24L0 24L0 0Z" id="path_1" />
                      <clipPath id="mask_1">
                        <use xlinkHref="#path_1" />
                      </clipPath>
                    </defs>
                    <g id="favicon">
                      <path d="M0 0L25.5273 0L25.5273 24L0 24L0 0Z" id="Background" fill="none" fillRule="evenodd" stroke="none" />
                      <g clipPath="url(#mask_1)">
                        <path d="M22.3167 19.0937C18.4119 22.3477 14.5914 23.9627 10.8552 23.9387C7.11909 23.9145 4.23863 22.2875 2.21388 19.0576C0.189128 15.8276 -0.389372 11.6094 0.478379 6.40285C1.34613 1.19635 4.44352 -0.804299 9.77054 0.400909C15.0976 1.60612 19.4966 4.20936 22.9675 8.21067C26.4386 12.212 26.2217 15.8396 22.3167 19.0937L22.3167 19.0937Z" id="Shape" fill="url(#gradient_1)" stroke="none" />
                      </g>
                    </g>
                  </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
