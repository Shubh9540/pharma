'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { FiActivity, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PharmaceuticalServicesData } from '@/types/templates.types';

interface ServicesProps {
  data: PharmaceuticalServicesData;
}

const ACCENT_BORDERS = [
  'border-l-[#0e63ff]',
  'border-l-[#2974ff]',
  'border-l-[#171151]',
  'border-l-[#f72a75]',
];

export function Services({ data }: ServicesProps) {
  const isSlider = data.items.length > 2;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: isSlider,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isSlider) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, isSlider, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isSlider || isPaused) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [emblaApi, isSlider, isPaused]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="services"
      className="w-full overflow-hidden bg-[var(--color-bg-soft)] py-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
            <FiActivity className="h-4 w-4 text-[var(--color-primary)]" />
            {data.eyebrow}
          </span>
          <h2 className="font-display-title mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl lg:text-4xl">
            {data.title}
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-[var(--color-text)]">
            {data.subtitle}
          </p>
        </div>

        {isSlider ? (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative flex items-center gap-3"
          >
            <button
              type="button"
              onClick={scrollPrev}
              aria-label={data.prevAriaLabel}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-heading)] shadow-sm transition-colors hover:bg-[var(--color-primary)] hover:text-white lg:flex"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="-ml-6 flex">
                  {data.items.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="min-w-0 flex-[0_0_100%] pl-6 lg:flex-[0_0_50%]"
                    >
                      <article
                        className={`group grid h-full grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border)] border-l-4 bg-[var(--color-card)] shadow-sm transition-shadow hover:shadow-md sm:grid-cols-12 ${
                          ACCENT_BORDERS[idx % ACCENT_BORDERS.length]
                        }`}
                      >
                        <div className="relative min-h-[210px] w-full overflow-hidden sm:col-span-5 sm:min-h-[260px]">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-col justify-between p-6 sm:col-span-7">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                                {item.category}
                              </span>
                              <span className="font-display-title text-sm font-bold text-[var(--color-text-muted)]">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-display-title mt-2 text-xl font-bold text-[var(--color-heading)]">
                              {item.title}
                            </h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text)]">
                              {item.summary}
                            </p>
                          </div>

                          <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                            <span>{item.formulation}</span>
                            <span className="rounded bg-[var(--color-primary-soft)] px-2.5 py-1 text-[var(--color-primary)]">
                              {item.code}
                            </span>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label={data.nextAriaLabel}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-heading)] shadow-sm transition-colors hover:bg-[var(--color-primary)] hover:text-white lg:flex"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {data.items.map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className="grid h-full grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm sm:grid-cols-12"
              >
                <div className="relative min-h-[210px] w-full overflow-hidden sm:col-span-5">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:col-span-7">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      {item.category}
                    </span>
                    <h3 className="font-display-title mt-2 text-xl font-bold text-[var(--color-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text)]">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {isSlider && scrollSnaps.length > 1 && (
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label={data.prevAriaLabel}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-heading)] lg:hidden"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={`srv-dot-${idx}`}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    selectedIndex === idx
                      ? 'w-8 bg-[var(--color-primary)]'
                      : 'w-2 bg-[var(--color-border)]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label={data.nextAriaLabel}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-heading)] lg:hidden"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
