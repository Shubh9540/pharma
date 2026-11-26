import type { ReactNode } from 'react';
import rawData from '@/data/templates.json';
import { PharmaceuticalTemplateData } from '@/types/templates.types';
import { Hero } from '@/components/sections/Hero';
import { AboutUs } from '@/components/sections/AboutUs';
import { Services } from '@/components/sections/Services';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Partners } from '@/components/sections/Partners';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const data = rawData as PharmaceuticalTemplateData;
  const sections = data.categories.Pharmaceutical.sections;
  const order = data.pages.home.components;

  const sectionMap: Record<string, ReactNode> = {
    Hero: <Hero data={sections.Hero.variants.PharmaceuticalHero2} />,
    AboutUs: <AboutUs data={sections.AboutUs.variants.PharmaceuticalAboutUs2} />,
    Services: <Services data={sections.Services.variants.PharmaceuticalServices2} />,
    WhyChooseUs: (
      <WhyChooseUs data={sections.WhyChooseUs.variants.PharmaceuticalWhyChooseUs2} />
    ),
    Testimonials: (
      <Testimonials data={sections.Testimonials.variants.PharmaceuticalTestimonials2} />
    ),
    Faq: <Faq data={sections.Faq.variants.PharmaceuticalFaq2} />,
    Partners: <Partners data={sections.Partners.variants.PharmaceuticalPartners2} />,
    Contact: <Contact data={sections.Contact.variants.PharmaceuticalContact2} />,
  };

  return (
    <main className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-[var(--color-bg-main)]">
      {order.map((item) => (
        <div key={item.key}>{sectionMap[item.key]}</div>
      ))}
    </main>
  );
}
