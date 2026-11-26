'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiActivity, FiAward, FiHeart, FiTruck } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { PharmaceuticalWhyChooseUsData, WhyChooseFeatureItem } from '@/types/templates.types';

interface WhyChooseUsProps {
  data: PharmaceuticalWhyChooseUsData;
}

function renderFeatureIcon(icon: WhyChooseFeatureItem['icon']) {
  switch (icon) {
    case 'flask':
      return <FaFlask className="h-5 w-5" />;
    case 'award':
      return <FiAward className="h-5 w-5" />;
    case 'truck':
      return <FiTruck className="h-5 w-5" />;
    case 'heart':
    default:
      return <FiHeart className="h-5 w-5" />;
  }
}

interface AnimatedCounterProps {
  value: string;
  active: boolean;
}

function AnimatedCounter({ value, active }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || target === 0) return;

    let frameId = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target]);

  if (!match) return <>{value}</>;
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="w-full overflow-hidden bg-[var(--color-primary-dark)] py-8 text-white lg:py-14"
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-6 border-b border-indigo-900 pb-8 lg:grid-cols-4">
          {data.stats.map((stat, idx) => (
            <div key={`${stat.id}-${idx}`} className="text-center sm:text-left">
              <div className="font-display-title text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter value={stat.value} active={hasEntered} />
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              <FiActivity className="h-4 w-4 text-[#60a5fa]" />
              {data.eyebrow}
            </span>
            <h2 className="font-display-title mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              {data.subtitle}
            </p>
          </div>

          <div className="rounded-lg bg-[var(--color-primary)] px-6 py-4 text-white">
            <div className="font-display-title text-3xl font-bold text-white">
              <AnimatedCounter value={data.highlightBadgeValue} active={hasEntered} />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              {data.highlightBadgeLabel}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {data.features.map((feature, idx) => (
              <div
                key={`${feature.id}-${idx}`}
                className="rounded-lg border border-indigo-900 bg-[var(--color-primary-deep)] p-6 transition-colors hover:border-[var(--color-accent)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-primary)] text-white">
                    {renderFeatureIcon(feature.icon)}
                  </div>
                  <span className="font-display-title text-lg font-bold text-white">
                    {feature.number}
                  </span>
                </div>
                <h3 className="font-display-title mt-4 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-indigo-900">
              <Image
                src={data.primaryImage}
                alt={data.primaryImageAlt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-lg border border-indigo-900">
              <Image
                src={data.secondaryImage}
                alt={data.secondaryImageAlt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
