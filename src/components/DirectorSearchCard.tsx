import { blackTapeLogo } from '../constants/assets'
import iceLogo from '../assets/intelligent-creative-engine-black.png'

const ICE_URL = 'https://intelligentcreative.io'

export function DirectorSearchCard() {
  return (
    <aside
      className="director-card"
      aria-label="Intelligent Creative Engine director search"
    >
      <span
        className="director-card__tape"
        aria-hidden="true"
        style={{ '--tape-image': `url(${blackTapeLogo})` } as Record<string, string>}
      />
      {/* The approved mockup sets each question on two lines, so the breaks are
          explicit and hold at every card width. The space before each <br /> is
          deliberate: it keeps the text content "Need a director?" and "Looking
          for reels?" intact for assistive technology. */}
      <p className="director-card__ask">
        Need a{' '}
        <br />
        director?
      </p>
      <p className="director-card__ask director-card__ask--alt">
        Looking{' '}
        <br />
        for reels?
      </p>
      <p className="director-card__lead">Try the director search at the new</p>
      <img
        className="director-card__logo"
        src={iceLogo}
        alt="Intelligent Creative Engine"
        width={1491}
        height={343}
      />
      <a className="director-card__cta" href={ICE_URL}>
        Find your director <span aria-hidden="true">↗</span>
      </a>
      <p className="director-card__domain">intelligentcreative.io</p>
      <span className="director-card__dots" aria-hidden="true" />
    </aside>
  )
}
