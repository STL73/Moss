import { Link } from 'react-router';
import Logo from './Logo';
import { footerLinks, socialMedia } from '../constants';

const Footer = () => (
    <footer className="border-t border-border mt-24">
        <div className="max-container padding-x py-16">
            <div className="flex justify-between flex-wrap gap-12 max-lg:flex-col">
                <div className="max-w-xs">
                    <Link to="/" className="flex items-center gap-2.5 text-accent">
                        <Logo size={30} />
                        <span className="font-display text-lg font-medium text-text">MossArt</span>
                    </Link>
                    <p className="mt-5 text-sm leading-relaxed text-text-muted">
                        Preserved Nordic moss, arranged by hand in small batches.
                        No watering, no light, no upkeep.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        {socialMedia.map(({ Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="size-9 rounded-full border border-border-interactive grid place-items-center
                                           text-text-muted hover:text-accent hover:border-accent
                                           transition-colors duration-200"
                            >
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex gap-16 flex-wrap">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h2 className="eyebrow">{section.title}</h2>
                            <ul className="mt-5 flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <p className="mt-16 pt-6 border-t border-border text-xs text-text-muted">
                © {new Date().getFullYear()} MossArt. Handmade in Manchester.
            </p>
        </div>
    </footer>
);

export default Footer;
