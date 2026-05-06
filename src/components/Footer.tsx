import { blackTapeLogo } from '../constants/assets'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-line">
        <a className="footer-brand" href="https://wfs.productions">
          We Film{' '}
          <span
            className="tape-word tape-word--subline"
            style={
              {
                '--tape-width': '2.1em',
                '--tape-image': `url(${blackTapeLogo})`,
              } as Record<string, string>
            }
          >
            <span className="tape-word__sr">SHIT</span>
          </span>
        </a>
        <span aria-hidden="true">|</span>
        <span>production services</span>
        <span aria-hidden="true">|</span>
        <a href="/privacy">Privacy</a>
        <span aria-hidden="true">|</span>
        <a href="/terms">Terms</a>
      </p>
      <p className="footer-line footer-family-line">
        <a href="https://intelligentcreative.io">intelligentcreative.io</a>
        <span aria-hidden="true">|</span>
        <a href="https://intelligentproduction.io">intelligentproduction.io</a>
        <span aria-hidden="true">|</span>
        <a href="https://wfsbudget.com">wfsbudget.com</a>
      </p>
    </footer>
  )
}
