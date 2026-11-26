import Image from 'next/image';
import { FiActivity, FiCheckCircle, FiGlobe, FiShield } from 'react-icons/fi';
import { FaMicroscope } from 'react-icons/fa';
import { AboutPillarItem, PharmaceuticalAboutUsData } from '@/types/templates.types';

interface AboutUsProps {
  data: PharmaceuticalAboutUsData;
}

function renderPillarIcon(icon: AboutPillarItem['icon']) {
  switch (icon) {
    case 'shield':
      return <FiShield className="h-5 w-5" />;
    case 'microscope':
      return <FaMicroscope className="h-5 w-5" />;
    case 'globe':
      return <FiGlobe className="h-5 w-5" />;
    case 'check':
    default:
      return <FiCheckCircle className="h-5 w-5" />;
  }
}

export function AboutUs({ data }: AboutUsProps) {
  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[340px] w-full overflow-hidden rounded-lg lg:min-h-[500px]">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              <FiActivity className="h-4 w-4 text-[var(--color-primary)]" />
              {data.eyebrow}
            </span>

            <h2 className="font-display-title mt-3 text-3xl font-bold leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[38px] lg:leading-[1.18]">
              {data.title}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[var(--color-text)] sm:text-lg">
              {data.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text)] sm:text-lg">
              {data.secondaryDescription}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.pillars.map((pillar, idx) => (
                <div
                  key={`${pillar.id}-${idx}`}
                  className="flex items-start gap-3.5 rounded-lg bg-[var(--color-bg-soft)] p-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-primary)] text-white">
                    {renderPillarIcon(pillar.icon)}
                  </span>
                  <div>
                    <h3 className="font-display-title text-base font-bold text-[var(--color-heading)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text)]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
