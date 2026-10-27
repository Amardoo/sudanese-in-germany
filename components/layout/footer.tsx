import Link from 'next/link';
import { Brand } from './header';
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />

        <p> مجتمعين نقف.متفرقين نسقط </p>

        <div className="footer-links">
          <Link href="/guides">استكشف الأدلة</Link>
          <Link href="/dashboard">مساري في ألمانيا</Link>
        </div>


        {/* الروابط القانونية — مطلوبة في ألمانيا (Impressum/Datenschutz) */}
        <div className="footer-legal">
          <Link href="/imprint"> الناشر (Impressum)</Link>
          <Link href="/privacy">سياسة الخصوصية</Link>
          <Link href="/terms">شروط المجتمع</Link>
        </div>


        {/* Social Icons */}
        <div className="social-icons" aria-label="Social media">
          <a
            href="https://www.facebook.com/SudaneseinGermany/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://wa.me/YOUR_PHONE_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://t.me/SDinGerm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <FaTelegramPlane />
          </a>

          <a
            href="https://www.youtube.com/@sudaneseingermany"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>

        <small dir="ltr">
          © {new Date().getFullYear()} Sudanese in Germany
        </small>
      </div>
    </footer>
  );
}