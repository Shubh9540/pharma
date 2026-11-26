'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { FiGrid, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { PharmaceuticalHeaderData, TopBarSocialItem } from '@/types/templates.types';

interface HeaderProps {
  data: PharmaceuticalHeaderData;
}

function renderSocialIcon(platform: TopBarSocialItem['platform']) {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedinIn className="h-4 w-4" />;
    case 'twitter':
      return <FaXTwitter className="h-4 w-4" />;
    case 'facebook':
      return <FaFacebookF className="h-4 w-4" />;
    case 'instagram':
    default:
      return <FaInstagram className="h-4 w-4" />;
  }
}

export function Header({ data }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(data.navLinks[0]?.href ?? '/#hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sectionIds = data.navLinks.map((link) =>
        link.href.replace(/^\/?#/, '')
      );
      let currentHref = data.navLinks[0]?.href ?? '/#hero';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentHref = `/#${id}`;
          }
        }
      }
      setActiveId(currentHref);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.navLinks]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-card)] transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-stretch justify-between">
        {/* Left Full-Height Logo Column */}
        <div className="flex shrink-0 items-center px-4 py-3 sm:px-6 lg:border-r lg:border-[var(--color-border)] lg:px-10">
          <Link href="/#hero" className="flex items-center">
            <Image
              src={data.logo}
              alt={data.logoAlt}
              width={220}
              height={60}
              unoptimized
              priority
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>
        </div>

        {/* Right 2-Row Split Column */}
        <div className="hidden flex-1 flex-col lg:flex">
          {/* Top Utility Row */}
          <div className="flex h-12 items-center justify-between border-b border-[var(--color-border)] px-8 text-sm">
            <div className="flex items-center gap-7">
              <a
                href={data.phoneHref}
                className="inline-flex items-center gap-2 font-bold tracking-wide text-[var(--color-heading)] transition-colors hover:text-[var(--color-primary)]"
              >
                <FiGrid className="h-4 w-4 text-[var(--color-primary)]" />
                <span className="font-semibold text-[var(--color-text-muted)]">
                  {data.helpLabel}
                </span>
                <span>{data.phone}</span>
              </a>

              <a
                href={data.emailHref}
                className="inline-flex items-center gap-2 font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <FiMail className="h-4 w-4 text-[var(--color-primary)]" />
                <span>{data.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              {data.socialLinks.map((item, idx) => (
                <a
                  key={`${item.id}-${idx}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                >
                  {renderSocialIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Nav & Flush Blue CTA Row */}
          <div className="flex flex-1 items-stretch justify-between pl-8">
            <nav className="flex items-center gap-8">
              {data.navLinks.map((item, idx) => {
                const isActive = activeId === item.href;
                return (
                  <Link
                    key={`${item.id}-${idx}`}
                    href={item.href}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href={data.ctaHref}
              className="inline-flex items-center justify-center bg-[var(--color-primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              {data.ctaText}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? data.closeMenuAriaLabel : data.mobileMenuAriaLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-heading)]"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-3">
            {data.navLinks.map((item, idx) => {
              const isActive = activeId === item.href;
              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'text-[var(--color-heading)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={data.ctaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-[var(--color-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              {data.ctaText}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
