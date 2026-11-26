import Image from 'next/image';
import { FiActivity } from 'react-icons/fi';
import { PharmaceuticalPartnersData } from '@/types/templates.types';

interface PartnersProps {
  data: PharmaceuticalPartnersData;
}

export function Partners({ data }: PartnersProps) {
  return (
    <section
      id="partners"
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {data.items.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex h-24 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-card)] hover:shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={180}
                height={44}
                unoptimized
                className="h-10 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

