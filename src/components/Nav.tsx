import { useState } from 'react'

const LOGIN_FALLBACK_URL = import.meta.env.VITE_IPE_LOGIN_FALLBACK_URL || 'https://intelligentproduction.io/login'
const IPE_OAUTH_GOOGLE_URL =
  import.meta.env.VITE_IPE_OAUTH_GOOGLE_URL ||
  'https://intelligentproduction.io/auth/start?provider=google&from=wfs'
const IPE_OAUTH_APPLE_URL =
  import.meta.env.VITE_IPE_OAUTH_APPLE_URL ||
  'https://intelligentproduction.io/auth/start?provider=apple&from=wfs'
const IPE_LOGO =
  'https://inqwtstopucpxfnuisus.supabase.co/storage/v1/object/public/company-logos/intelligent-production-engine/ipe-black.png'

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="WFS Productions home">
        <img
          src="https://intelligentcreative.io/wfs-logo-black.png"
          alt="WFS Productions"
          className="wfs-logo"
        />
      </a>

      <button
        type="button"
        className="nav-menu-toggle"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
      >
        <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
      </button>

      <nav className="desktop-nav" aria-label="Primary">
        <a href="/about">About us</a>
        <a href="/join">Join</a>
        <a href="/tools">AI Tools</a>
        <a href="/blog">Founders Blog</a>
        <a href="/contact">Contact us</a>
        <button type="button" className="login-link" onClick={() => setIsLoginOpen(true)}>
          Login
        </button>
      </nav>

      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Primary mobile">
          <a href="/about" onClick={() => setIsMenuOpen(false)}>
            About us
          </a>
          <a href="/join" onClick={() => setIsMenuOpen(false)}>
            Join
          </a>
          <a href="/tools" onClick={() => setIsMenuOpen(false)}>
            AI Tools
          </a>
          <a href="/blog" onClick={() => setIsMenuOpen(false)}>
            Founders Blog
          </a>
          <a href="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact us
          </a>
          <button
            type="button"
            className="mobile-login-button"
            onClick={() => {
              setIsMenuOpen(false)
              setIsLoginOpen(true)
            }}
          >
            Login
          </button>
        </nav>
      )}

      {isLoginOpen && (
        <div className="login-modal-backdrop" role="presentation" onClick={() => setIsLoginOpen(false)}>
          <section
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="login-modal-close"
              aria-label="Close login"
              onClick={() => setIsLoginOpen(false)}
            >
              x
            </button>
            <img src={IPE_LOGO} alt="Intelligent Production Engine" />
            <h2 id="login-modal-title">Sign in</h2>
            <p>WFS account access runs through Intelligent Production Engine.</p>
            <div className="login-oauth-stack" aria-label="OAuth sign in options">
              <a className="login-oauth-button" href={IPE_OAUTH_GOOGLE_URL} aria-label="Continue with Google">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
                </svg>
              </a>
              <a className="login-oauth-button login-oauth-button--dark" href={IPE_OAUTH_APPLE_URL} aria-label="Continue with Apple">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" fill="currentColor" />
                </svg>
              </a>
            </div>
            <a className="login-modal-primary" href={LOGIN_FALLBACK_URL}>
              Open sign in
            </a>
            <p>
              Need access? <a href="/join">Request an invite</a>
            </p>
          </section>
        </div>
      )}
    </header>
  )
}
