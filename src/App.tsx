import './App.css'
import { createElement, useEffect, useRef } from 'react'
import { blackTapeLogo, wfsBudgetLogo } from './constants/assets'
import dubayLogo from './assets/dubay-skyblue-main.png'
import { SiteFooter } from './components/Footer'
import { SiteNav } from './components/Nav'

const NYLAS_CONFIG_ID =
  import.meta.env.VITE_WFS_NYLAS_CONFIG_ID ||
  'b542e63b-6c10-4681-b8b7-4adf6fbb22f0'

const BOOKING_URL =
  import.meta.env.VITE_WFS_NYLAS_BOOKING_URL ||
  import.meta.env.VITE_WFS_BOOKING_URL ||
  '/book'

const BOOKING_LINK_PROPS = BOOKING_URL.startsWith('http')
  ? { target: '_blank', rel: 'noreferrer' }
  : {}

const BLOG_POSTS = [
  {
    title: "I Built a Poor-Man's Enterprise AI Team on a MacBook Pro",
    description:
      'Four agents, two product lines, zero developers, one filmmaker. The story, the stack, and a real step-by-step guide at the end.',
    href: 'https://wefilmshit.substack.com/p/i-built-a-poor-mans-enterprise-ai',
    date: 'May 3, 2026',
    image:
      'https://substackcdn.com/image/fetch/$s_!atyZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffc4da7ff-22aa-4373-8965-ace8f432e0b1_1672x941.png',
  },
  {
    title: "Our AIs Have Amnesia. Here's How I Fixed Mine.",
    description:
      "I built an open-source memory system for AI that costs about $5/month to run. Now my Claude remembers my ADHD communication preferences, my project rules, and every technical mistake it's ever made.",
    href: 'https://wefilmshit.substack.com/p/our-ais-have-amnesia-heres-how-i',
    date: 'March 28, 2026',
    image:
      'https://substackcdn.com/image/fetch/$s_!qy97!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff60194d3-91ca-45e5-bb07-b5cdc3be5c0a_940x788.png',
  },
  {
    title: 'Was Terrified of AI. Then I Built a SaaS With AI For My Production Company.',
    description:
      "A producer's honest take on what happens when you stop fighting the robot and start collaborating.",
    href: 'https://wefilmshit.substack.com/p/was-terrified-of-ai-then-i-built',
    date: 'March 27, 2026',
    image:
      'https://substackcdn.com/image/fetch/$s_!PRsM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F643dfa31-ff76-4745-b66f-1df34936bc64_598x401.heic',
  },
]

const AI_TOOLS = [
  {
    title: 'Intelligent Production Engine',
    job: 'Modernized back office for real production work.',
    description:
      'Paperwork, approvals, budgets, and moving parts, built by producers who know where jobs actually slow down.',
    builtFor: 'EPs, line producers, production teams',
    href: 'https://intelligentproduction.io',
    logo: 'https://inqwtstopucpxfnuisus.supabase.co/storage/v1/object/public/company-logos/intelligent-production-engine/ipe-black.png',
    logoClassName: 'tool-logo tool-logo--ipe',
  },
  {
    title: 'Intelligent Creative Engine',
    job: 'Director search based on the work, not the roster page.',
    description:
      'A smarter way to get the right jobs in front of the right independent directors, using actual creative work as proof.',
    builtFor: 'Agency producers, brands, directors',
    href: 'https://intelligentcreative.io',
    logo: 'https://intelligentcreative.io/Intelligent_Creative_Engine_Black.png',
    logoClassName: 'tool-logo tool-logo--ice',
  },
  {
    title: 'WFS Budget',
    job: 'Free production budgeting. No spreadsheet theater.',
    description:
      'Fast, clean production budgeting that keeps the numbers usable without turning the whole job into admin cosplay.',
    builtFor: 'Freelance producers, directors, small teams',
    href: 'https://wfsbudget.com',
    logo: wfsBudgetLogo,
    logoClassName: 'tool-logo tool-logo--budget',
  },
]

function TapeWord({ width = '2.2em' }: { width?: string }) {
  return (
    <span
      className="tape-word"
      aria-hidden="true"
      style={
        {
          '--tape-width': width,
          '--tape-image': `url(${blackTapeLogo})`,
        } as Record<string, string>
      }
    >
      <span className="tape-word__sr">SHIT</span>
    </span>
  )
}

function Hero() {
  return (
    <section className="hero" aria-label="We Film">
      <h1 className="hero-wordmark">
        We Film <TapeWord width="2.2em" />
      </h1>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="landing-section">
      <p>
        WFS is a production company that knows it's not the product. The director is. The
        line producer is. The crew is. So we built the infrastructure around them and for them.
        We handle the boring <TapeWord />.
      </p>
      <p>No gatekeeping. No overhead. No ego.</p>
    </section>
  )
}

function ModelSection() {
  return (
    <section className="landing-section">
      <h2>A production services company for the people doing the job.</h2>
      <p>
        We built WFS for independent directors and line producers. You can't get more
        talent-driven than that. We are the only production company out there sharing ownership
        of each job with the directors and producers actually doing the work.
      </p>
      <h2>Less <TapeWord width="1.65em" /> between the client, the agency, and the work.</h2>
      <p>
        The industry built a whole mythology around the production company as the creative engine.
      </p>
      <p>
        Truth is, they are not the ones doing the <TapeWord />. We are. They have been
        hiring us this whole time. They can downsize all they want, but at
        the end of the day, they are the bloat.
      </p>
      <p>
        With WFS, the team you award the job to is the same team with you every step of the way.
        No sales layer calling the shots from behind a desk.
      </p>
      <p>
        Better, faster, with less bull<TapeWord />.
      </p>
    </section>
  )
}

function AboutPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">About Us</h1>
        <h2>The old production-company model does not work anymore.</h2>
        <p>
          Budgets got tighter. Project windows got shorter. The paperwork somehow got longer.
        </p>
        <p>
          The other guys may have prettier websites and more polished prose. Fine. Take one
          look at their 89-page production guide and you will see the problem.
        </p>
        <p>
          We could complain about that. We did. For a while. Then we decided to build it
          differently.
        </p>
      </section>

      <section className="landing-section">
        <h2>Production services, without the production bull<TapeWord />.</h2>
        <p>
          WFS is a production services company built around independent directors and line
          producers. We modernized the back office so the people doing the job can spend less
          time fighting paperwork, approvals, and overhead, and more time making the work
          better.
        </p>
        <p>
          Insurance. Payroll. P-Cards. Gear. Crew. Vendors. Budgets. Logistics. We still handle
          the things a production company has to handle.
        </p>
        <p>
          We just do it without the extra performance.
        </p>
      </section>

      <section className="landing-section">
        <h2>Built to get out of the way.</h2>
        <p>
          No offices to feed. No sales team calling the shots. No bloated machine getting in
          the way.
        </p>
        <p>
          The model is simple. Put the people doing the work closer to the client, the agency,
          and the decisions. Share the job with them. Give them infrastructure that helps
          instead of slows them down.
        </p>
        <p>
          Better process. Better ownership. Better work.
        </p>
      </section>

      <a className="about-tools-link" href="/tools">
        Learn more about the tools we made to make this happen
      </a>
    </main>
  )
}

function ToolsPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">AI Tools</h1>
        <h2>The tools we made to make this model work.</h2>
        <p>
          WFS works because we modernized the part of production nobody puts on the
          moodboard. The paperwork. The budgets. The matching. The operational drag that
          gets between the brief and the work.
        </p>
      </section>

      <section className="tools-page-grid" aria-label="AI tools">
        {AI_TOOLS.map((tool) => (
          <article key={tool.title} className="tools-page-card">
            <img className={tool.logoClassName} src={tool.logo} alt={tool.title} />
            <h2>{tool.job}</h2>
            <p>{tool.description}</p>
            <p className="tool-built-for">
              <span>Built for</span>
              {tool.builtFor}
            </p>
            <a href={tool.href}>Open tool</a>
          </article>
        ))}
      </section>

    </main>
  )
}

function JoinPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">Join</h1>
        <h2>This is not a roster. It is a better way to work.</h2>
        <p>
          WFS exists so independent directors and freelance producers can stop doing the
          hard part alone. You keep your freedom. We give you infrastructure, a brand clients
          can trust, and a shot at building something better together.
        </p>
      </section>

      <section className="landing-section">
        <h2>What we are building.</h2>
        <p>
          <strong>The infrastructure:</strong> insurance, payroll, accounting, banking,
          P-Cards, and the things you need to run jobs through a real production company.
        </p>
        <p>
          <strong>The brand:</strong> something that earns trust with agencies and clients,
          so we can bring in more jobs, and better ones.
        </p>
        <p>
          <strong>The model:</strong> when you produce or direct through WFS, you are not
          just a day rate on someone else&apos;s job. You share in the job you are helping
          make.
        </p>
      </section>

      <section className="landing-section">
        <h2>Who it is for.</h2>
        <p>
          Producers who are already line producing, bidding, and managing jobs, and want to
          keep more of what they make.
        </p>
        <p>
          Directors who are off-roster, independent, emerging, or transitioning, and want a
          platform that helps them pitch, bid, and shoot without the baggage.
        </p>
        <p>
          Freelance producers and independent directors for commercials, film, and TV. No
          overhead. No exclusivity. Just the best talent assembled on demand.
        </p>
      </section>

      <section className="landing-section">
        <h2>What it is not.</h2>
        <p>No exclusivity. No pressure. No bull<TapeWord />.</p>
      </section>

      <section className="landing-section">
        <h2>Sound like you?</h2>
        <p>
          We are building something better. If that speaks to you, we want to hear from you.
        </p>
        <p>
          Email us at <a href="mailto:hello@wfs.productions">hello@wfs.productions</a>.
          Tell us who you are, what you do, and why you are tired of doing it for other
          people.
        </p>
      </section>
    </main>
  )
}

function ContactPage() {
  return (
    <main id="main-content" className="landing-shell contact-shell">
      <section className="contact-hero">
        <h1>Contact</h1>
        <p className="contact-lede">Need a treatment tomorrow? Want a bid next week?</p>
        <p>Let&apos;s talk, we&apos;ll show you how fast great work gets done.</p>
        <p>
          Agency producer, brand team, director with a job in hand. Bring us the problem.
          We will help you make the shoot work.
        </p>
        <a className="contact-booking-link" href={BOOKING_URL} {...BOOKING_LINK_PROPS}>
          Book a meeting with us
        </a>
        <a className="contact-email" href="mailto:hello@wfs.productions">
          hello@wfs.productions
        </a>
      </section>

      <section className="dubay-card" aria-label="East Coast rep">
        <p>Dana Dubay, East Coast Rep</p>
        <img src={dubayLogo} alt="Dubay" />
        <p>
          <a href="tel:+19176967832">917.696.7832</a>
          <span aria-hidden="true">|</span>
          <a href="mailto:dana@dubay.tv">dana@dubay.tv</a>
          <span aria-hidden="true">|</span>
          <a href="https://dubay.tv">dubay.tv</a>
        </p>
      </section>
    </main>
  )
}

function BookingPage() {
  const schedulerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadScheduler() {
      const schedulerModuleUrl =
        'https://cdn.jsdelivr.net/npm/@nylas/web-elements@latest/dist/cdn/nylas-scheduling/nylas-scheduling.es.js'
      const module = await import(
        /* @vite-ignore */
        schedulerModuleUrl
      )
      if (typeof module.defineCustomElement === 'function') {
        module.defineCustomElement()
      }

      if (cancelled || !schedulerRef.current) return
      const scheduler = schedulerRef.current as HTMLElement & {
        schedulerApiUrl?: string
        configurationId?: string
        defaultTimezone?: string
        themeConfig?: Record<string, string>
      }

      scheduler.schedulerApiUrl = 'https://api.us.nylas.com'
      scheduler.configurationId = NYLAS_CONFIG_ID
      scheduler.defaultTimezone = 'America/New_York'
      scheduler.themeConfig = {
        '--nylas-primary': '#111111',
        '--nylas-base-0': '#fafaf7',
        '--nylas-base-100': '#f4f4ef',
        '--nylas-base-200': '#e2e2da',
        '--nylas-font-family': 'Geist, Arial, sans-serif',
        '--nylas-border-radius': '6px',
      }
    }

    loadScheduler().catch((error) => {
      console.error('Could not load Nylas scheduler', error)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main id="main-content" className="booking-shell">
      <section className="booking-intro">
        <p className="section-kicker">WFS Productions</p>
        <h1>Book a meeting</h1>
        <p>
          Pick a time with WFS. The scheduler below is where meeting availability will live
          once the public booking link is confirmed.
        </p>
      </section>

      <section className="booking-panel" aria-label="WFS booking scheduler">
        {createElement('nylas-scheduling', { ref: schedulerRef })}
      </section>

      <p className="booking-note">
        Hosted booking availability depends on the confirmed WFS Nylas scheduler URL.
      </p>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">Privacy</h1>
        <p>
          WFS uses contact details and meeting information only to respond to production
          inquiries, schedule calls, and run the work you ask us to run.
        </p>
        <p>
          We do not publish private client data, private production records, or internal
          workflow material on public pages.
        </p>
      </section>
    </main>
  )
}

function TermsPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">Terms</h1>
        <p>
          WFS public pages are informational. Specific production services, budgets,
          schedules, and project terms are confirmed directly with the production team.
        </p>
      </section>
    </main>
  )
}

function BlogPage() {
  return (
    <main id="main-content" className="landing-shell about-shell">
      <section className="landing-section">
        <h1 className="page-title">Founders Blog</h1>
        <h2>Notes from inside the build.</h2>
        <details className="founder-story">
          <summary>Read the founder story</summary>
          <p>
            I grew up in Arlington, Texas, loving movies but never thinking the film business was
            an achievable goal. Film was my escape. At 16, I got my first job at AMC Green Oaks
            8 and worked my way up to projection supervisor. Still my favorite job, if we are
            being honest. I went to the University of Texas at Arlington for business, until a
            very kind counselor convinced me to check out the film program and give it a chance.
            I have been chasing the dream ever since.
          </p>
          <p>
            For more than twenty years, my job has been making production actually work. I moved
            to LA in my twenties, and now I am raising my family in New England.
          </p>
          <p>
            Production is in my blood. I have done it all: union, non-union, regional and national
            ad campaigns, film, television, big jobs, weird jobs, impossible schedules, Super
            Bowl-level chaos, NBA Finals-level pressure. Budgets, vendors, crew, payroll, licensing,
            insurance, taxes, final delivery. I love it. I thrive on the pressure of a job that has
            to go right.
          </p>
          <p>
            I never wanted to be an EP. I might be the worst salesman. But I got tired of being
            forced to do the work inefficiently. WFS came out of the idea that we just want to film
            <TapeWord /> without the bull<TapeWord /> getting in the way. I can do my job better if
            I am spending less time on the paperwork.
          </p>
          <p>
            The Intelligent Creative Engine started as a tool I made to get to know directors
            better. The Intelligent Production Engine started as me sitting down with Claude Code
            and asking if it could help solve a laundry list of production problems I had been
            carrying around for years.
          </p>
          <p>
            WFS is not a tech idea looking for a production problem. It is the company I wish I
            could freelance for. AI is not replacing anyone here. It is finally giving a working
            production team enough leverage to build the dream machine: a smarter back office,
            better director search, cleaner process, and less boring <TapeWord /> between the
            creative and the shoot.
          </p>
        </details>
        <p>
          Below is the story of building WFS and the tools behind it. How they are being built,
          what they are meant to fix, and why I am doing this in the first place.
        </p>
        <p>
          <a href="https://producer.boston/">Portfolio</a>
          {' | '}
          <a href="https://www.linkedin.com/in/tonywfinley/">LinkedIn</a>
          {' | '}
          <a href="https://www.instagram.com/tonywfinley/">Instagram</a>
        </p>
      </section>

      <section className="blog-list" aria-label="Substack posts">
        {BLOG_POSTS.map((post) => (
          <article key={post.href} className="blog-card">
            <a className="blog-image-link" href={post.href} aria-label={post.title}>
              <img src={post.image} alt="" />
            </a>
            <p className="blog-date">{post.date}</p>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <a href={post.href}>Read on Substack</a>
          </article>
        ))}
      </section>
    </main>
  )
}

function App() {
  const isAboutPage = window.location.pathname === '/about'
  const isToolsPage = window.location.pathname === '/tools'
  const isJoinPage = window.location.pathname === '/join'
  const isContactPage = window.location.pathname === '/contact'
  const isBookPage = window.location.pathname === '/book'
  const isBlogPage = window.location.pathname === '/blog'
  const isPrivacyPage = window.location.pathname === '/privacy'
  const isTermsPage = window.location.pathname === '/terms'

  return (
    <div className="page-shell">
      <SiteNav />
      {isToolsPage ? (
        <ToolsPage />
      ) : isJoinPage ? (
        <JoinPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isBookPage ? (
        <BookingPage />
      ) : isBlogPage ? (
        <BlogPage />
      ) : isPrivacyPage ? (
        <PrivacyPage />
      ) : isTermsPage ? (
        <TermsPage />
      ) : isAboutPage ? (
        <AboutPage />
      ) : (
        <main id="main-content" className="landing-shell">
          <Hero />
          <Manifesto />
          <ModelSection />
        </main>
      )}
      <SiteFooter />
    </div>
  )
}

export default App
