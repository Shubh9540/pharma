import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { PharmaceuticalHeroData } from '@/types/templates.types';

interface HeroProps {
  data: PharmaceuticalHeroData;
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="hero-surface relative w-full overflow-hidden py-16 lg:py-28"
    >
      <div className="absolute inset-0">
        <Image
          src={data.backgroundImage}
          alt={data.backgroundAlt}
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(16, 11, 59, 0.94) 0%, rgba(23, 17, 81, 0.84) 48%, rgba(14, 99, 255, 0.36) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display-title text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px] lg:leading-[1.12]">
            {data.title}{' '}
            <span className="text-[#60a5fa]">{data.titleHighlight}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {data.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={data.primaryCtaHref}
              className="inline-flex items-center gap-2 rounded-md bg-[#0e63ff] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#2974ff]"
            >
              <span>{data.primaryCtaText}</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={data.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-transparent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#60a5fa] hover:text-[#60a5fa]"
            >
              {data.secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
