import { Clapperboard, Github, Instagram, Linkedin, Tv, TwitterIcon, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const socials = [
  { label: "GitHub", href: "https://github.com/AlokKumarYadav2410", icon: <Github size={16} /> },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/alokkumaryadav2410", icon: <Linkedin size={16} /> },
  { label: "Twitter", href: "https://twitter.com/AlokDevJourney", icon: <TwitterIcon size={16} /> },
  // { label: "Instagram", href: "#", icon: <Instagram size={16} /> },
  // { label: "YouTube", href: "#", icon: <Youtube size={16} /> }
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <h3>
          <Link to="/" className={styles.brandLink}> <Clapperboard size={32} />Movix</Link>
        </h3>
        <p>
          Crafted with 💖 by <strong>Alok Kumar Yadav</strong>.
        </p>
      </div>

      <div className={styles.links}>
        {socials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={styles.link}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <small className={styles.copy}>Made with love for movie lovers.</small>
    </footer>
  );
};

export default Footer;
