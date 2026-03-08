import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const socials = [
  { label: "GitHub", href: "#", icon: <Github size={16} /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin size={16} /> },
  { label: "Instagram", href: "#", icon: <Instagram size={16} /> },
  { label: "YouTube", href: "#", icon: <Youtube size={16} /> }
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <h3>
          <Link to="/" className={styles.brandLink}>Movix</Link>
        </h3>
        <p>
          Crafted with love by <strong>Your Name</strong>.
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
