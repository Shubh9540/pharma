import Image from 'next/image';
import { FiActivity, FiStar } from 'react-icons/fi';
import { PharmaceuticalTestimonialsData } from '@/types/templates.types';

interface TestimonialsProps {
  data: PharmaceuticalTestimonialsData;
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.items.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              className="flex h-full flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center gap-1 text-[var(--color-primary)]">
                  {Array.from({ length: item.rating }).map((_, sIdx) => (
                    <FiStar key={`star-${item.id}-${sIdx}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-4 text-base leading-relaxed text-[var(--color-heading)] sm:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-border)] pt-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)]">
                  <Image
                    src={item.avatar}
                    alt={item.avatarAlt}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-display-title text-base font-bold text-[var(--color-heading)]">
                    {item.name}
                  </div>
                  <div className="text-sm text-[var(--color-text)]">
                    {item.role} ·{' '}
                    <span className="font-semibold text-[var(--color-primary)]">
                      {item.organization}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
