import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { PharmaceuticalFooterData } from '@/types/templates.types';

interface FooterProps {
  data: PharmaceuticalFooterData;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="w-full overflow-hidden bg-[var(--color-primary-dark)] text-white">
      <div className="mx-auto max-w-[1280px] px-4 pb-6 pt-12 lg:px-8 lg:pb-6 lg:pt-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/#hero" className="inline-flex items-center">
              <Image
                src={data.logo}
                alt={data.logoAlt}
                width={220}
                height={60}
                unoptimized
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {data.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display-title text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              {data.quickLinksTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {data.quickLinks.map((link, idx) => (
                <li key={`${link.id}-${idx}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display-title text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              {data.usefulLinksTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {data.usefulLinks.map((link, idx) => (
                <li key={`${link.id}-${idx}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display-title text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              {data.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#60a5fa]" />
                <span>{data.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                <a href={data.phoneHref} className="transition-colors hover:text-white">
                  {data.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                <a href={data.emailHref} className="transition-colors hover:text-white">
                  {data.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-indigo-900 pt-4 text-center text-xs text-slate-400">
          {data.copyrightText}
        </div>
      </div>
    </footer>
  );
}
