import { useEffect, useState, type FormEvent } from 'react'

const IPE_PUBLIC_ORIGIN =
  import.meta.env.VITE_IPE_PUBLIC_ORIGIN ||
  (['127.0.0.1', 'localhost'].includes(window.location.hostname)
    ? 'http://127.0.0.1:5175'
    : 'https://intelligentproduction.io')
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://inqwtstopucpxfnuisus.supabase.co'
const AUTH_HANDOFF_START_URL =
  import.meta.env.VITE_IPE_AUTH_HANDOFF_START_URL ||
  `${SUPABASE_URL}/functions/v1/ipe-auth-handoff-start`
const SUPABASE_AUTH_URL =
  import.meta.env.VITE_SUPABASE_AUTH_URL ||
  `${SUPABASE_URL}/auth/v1`
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsImtpZCI6IkxMc01BU1Npa0lDa2FrNiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lucXd0c3RvcHVjcHhmbnVpc3VzLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJyZWYiOiJpbnF3dHN0b3B1Y3B4Zm51aXN1cyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzQzMzA1NzI0LCJleHAiOjIwNTg4ODE3MjR9.6S9Qki_BPoQfHE3_xSGfKWRyUew8dM6CPsY1Z6A8WNU'
const IPE_AUTH_CALLBACK_URL = `${IPE_PUBLIC_ORIGIN}/auth/callback`
const buildOAuthUrl = (provider: 'google' | 'apple') =>
  `${SUPABASE_AUTH_URL}/authorize?provider=${provider}&redirect_to=${encodeURIComponent(IPE_AUTH_CALLBACK_URL)}`
const IPE_OAUTH_GOOGLE_URL = buildOAuthUrl('google')
const IPE_OAUTH_APPLE_URL = buildOAuthUrl('apple')
const IPE_LOGO =
  'https://inqwtstopucpxfnuisus.supabase.co/storage/v1/object/public/company-logos/intelligent-production-engine/ipe-black.png'
const ACCESS_REQUESTS_URL = `${SUPABASE_URL}/rest/v1/access_requests`

type AuthMode = 'signin' | 'request'
type RoleChoice = 'director' | 'agent' | 'ep'

const ROLE_OPTIONS: { value: RoleChoice; label: string; description: string }[] = [
  { value: 'director', label: 'Director', description: 'I direct commercials and want to be on the roster.' },
  { value: 'agent', label: 'Agent / Rep', description: 'I represent directors and manage creative opportunities.' },
  { value: 'ep', label: 'EP / Producer', description: 'I produce work and source directors for projects.' },
]

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<RoleChoice | ''>('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [note, setNote] = useState('')
  const [loginError, setLoginError] = useState('')
  const [requestError, setRequestError] = useState('')
  const [requestSuccess, setRequestSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoginOpen) return undefined

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isLoginOpen])

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode)
    setLoginError('')
    setRequestError('')
    setRequestSuccess('')
    setIsLoginOpen(true)
  }

  const closeAuthModal = () => {
    setIsLoginOpen(false)
    setLoginError('')
    setRequestError('')
  }

  const switchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode)
    setLoginError('')
    setRequestError('')
    setRequestSuccess('')
  }

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(AUTH_HANDOFF_START_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload.redirectUrl) {
        throw new Error(payload.error || 'Unable to sign in.')
      }

      window.location.href = payload.redirectUrl
    } catch {
      setLoginError('Could not sign in. Check your email and password and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAccessRequestSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!role) {
      setRequestError('Please select a role.')
      return
    }

    setRequestError('')
    setRequestSuccess('')
    setIsSubmitting(true)

    try {
      const response = await fetch(ACCESS_REQUESTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify([{
          requested_role: role,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim() || null,
          note: note.trim() || null,
        }]),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.message || payload.error || 'Could not join the wait list.')
      }

      setRequestSuccess(`You are on the wait list. We will be in touch at ${email.trim().toLowerCase()}.`)
      setRole('')
      setName('')
      setEmail('')
      setCompany('')
      setNote('')
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Could not join the wait list.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <a href="/tools">AI Tools</a>
        <a href="/blog">Founders Blog</a>
        <a href="/contact">Contact us</a>
        <button type="button" className="login-link" onClick={() => openAuthModal('signin')}>
          Login
        </button>
      </nav>

      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Primary mobile">
          <a href="/about" onClick={() => setIsMenuOpen(false)}>
            About us
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
              openAuthModal('signin')
            }}
          >
            Login
          </button>
        </nav>
      )}

      {isLoginOpen && (
        <div className="login-modal-backdrop" role="presentation" onClick={closeAuthModal}>
          <section
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={authMode === 'signin' ? 'login-modal-title' : 'request-modal-title'}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="login-modal-close"
              aria-label="Close login"
              onClick={closeAuthModal}
            >
              x
            </button>
            <img src={IPE_LOGO} alt="Intelligent Production Engine" />
            {authMode === 'signin' ? (
              <>
                <h2 id="login-modal-title">Sign in</h2>
                <p>Sign in happens on Intelligent Production Engine.</p>
                <form className="login-modal-form" onSubmit={handleLoginSubmit}>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <span>Password</span>
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </label>
                  {loginError && <p className="login-modal-error">{loginError}</p>}
                  <button className="login-modal-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
                <div className="login-modal-divider">
                  <span>or</span>
                </div>
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
                <p>
                  Need access?{' '}
                  <button type="button" className="login-modal-toggle-link" onClick={() => switchAuthMode('request')}>
                    Request access
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 id="request-modal-title">Join the wait list</h2>
                <p>Intelligent Production Engine is invite-only. Tell us about yourself.</p>
                <form className="login-modal-form login-modal-form--request" onSubmit={handleAccessRequestSubmit}>
                  <div className="login-request-options" role="radiogroup" aria-label="Select your role">
                    {ROLE_OPTIONS.map((option) => {
                      const selected = role === option.value

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`login-request-option${selected ? ' is-selected' : ''}`}
                          onClick={() => setRole(option.value)}
                          aria-pressed={selected}
                        >
                          <strong>{option.label}</strong>
                          <span>{option.description}</span>
                        </button>
                      )
                    })}
                  </div>
                  <label>
                    <span>Full name</span>
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Jane Smith" required />
                  </label>
                  <label>
                    <span>Work email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="jane@agency.com"
                      required
                    />
                  </label>
                  <label>
                    <span>Company</span>
                    <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="BBDO, Freelance, etc." />
                  </label>
                  <label>
                    <span>Anything else to add?</span>
                    <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="How you heard about us, referral name, etc." rows={3} />
                  </label>
                  {requestError && <p className="login-modal-error">{requestError}</p>}
                  {requestSuccess && <p className="login-modal-success">{requestSuccess}</p>}
                  <button className="login-modal-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Join the wait list'}
                  </button>
                </form>
                <p>
                  Already have an account?{' '}
                  <button type="button" className="login-modal-toggle-link" onClick={() => switchAuthMode('signin')}>
                    Sign in
                  </button>
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </header>
  )
}
