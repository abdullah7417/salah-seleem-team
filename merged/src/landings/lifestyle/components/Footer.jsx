import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import logo from "@/assets/logo-new.svg";
import { siteBaseUrl } from "@/config/site";

/**
 * Footer — dark style matching the reference screenshot:
 * - Full-width black background (no rounded container)
 * - 4 columns: logo+tagline | الشركة | تواصل معنا | وسائل التواصل
 * - Section titles in orange/primary, body in white/70
 */
export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-10 md:gap-8 md:grid-cols-4 text-right">
          {/* Column 1 — logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-5 justify-start">
              <img src={logo} alt="logo" />
            </div>
            <p className="text-white/70 leading-[1.9] text-[14px]">
              انضم للآلاف في أقوى برنامج تخطيط رياضي وتأهيل بدني وصحي هيساعدك توصل لأحسن نسخة من
              نفسك
            </p>
          </div>

          {/* Column 2 — الشركة */}
          <div>
            <h4 className="text-primary text-lg mb-5 font-medium">الشركة</h4>
            <ul className="space-y-3">
              <li>
                <a href={`${siteBaseUrl}/about`} className="text-white/80 hover:text-primary transition text-[14px]">
                  من نحن
                </a>
              </li>
              <li>
                <a href={`${siteBaseUrl}/privacy-policy`} className="text-white/80 hover:text-primary transition text-[14px]">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href={`${siteBaseUrl}/terms-and-conditions`} className="text-white/80 hover:text-primary transition text-[14px]">
                  الشروط والأحكام
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — تواصل معنا */}
          <div>
            <h4 className="text-primary text-lg mb-5 font-medium">تواصل معنا</h4>
            <p className="text-white/80 text-[14px] mb-3">دبي - ابراج بحيرات جميرا - برج الماس</p>
            <a
              href="tel:+201050001587"
              dir="ltr"
              className="block text-white/80 hover:text-primary transition text-[14px] mb-3 text-right"
            >
              (+20)1050001587
            </a>
            <a
              href="mailto:info@salahseleemteam.com"
              className="block text-white/80 hover:text-primary transition text-[14px]"
            >
              info@salahseleemteam.com
            </a>
          </div>

          {/* Column 4 — social */}
          <div>
            <h4 className="text-primary text-lg mb-5 font-medium">وسائل التواصل الاجتماعي</h4>
            <div className="flex items-center gap-3 justify-start flex-wrap">
              {[
                { Icon: FaWhatsapp, href: "https://wa.me/201050001587" },
                { Icon: FaTiktok, href: "https://www.tiktok.com/@salah.seleem.team" },
                { Icon: FaYoutube, href: "https://youtube.com/@SalahSelemteam" },
                { Icon: FaInstagram, href: "https://www.instagram.com/salahseleemteam/" },
                { Icon: FaFacebookF, href: "https://www.facebook.com/salah.seleem.team/" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-[4px] bg-white/10 hover:bg-primary grid place-items-center transition"
                  aria-label="social"
                >
                  <Icon className="w-[14px] h-[14px] text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center md:text-center">
          <p className="text-white/60 text-[13px]">
            تم التصميم والتطوير بواسطة{" "}
            <a href="https://codebase-tech.com/" className="text-primary hover:underline font-semibold">
              Codebase-tech.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
