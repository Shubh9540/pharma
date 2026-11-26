export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  displayFontFamily: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface TopBarSocialItem {
  id: string;
  label: string;
  href: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
}

export interface PharmaceuticalHeaderData {
  helpLabel: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  socialLinks: TopBarSocialItem[];
  logo: string;
  logoAlt: string;
  navLinks: NavLinkItem[];
  ctaText: string;
  ctaHref: string;
  mobileMenuAriaLabel: string;
  closeMenuAriaLabel: string;
}

export interface PharmaceuticalHeroData {
  title: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export interface AboutPillarItem {
  id: string;
  title: string;
  description: string;
  icon: 'shield' | 'microscope' | 'globe' | 'check';
}

export interface PharmaceuticalAboutUsData {
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  image: string;
  imageAlt: string;
  pillars: AboutPillarItem[];
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  summary: string;
  formulation: string;
  image: string;
  imageAlt: string;
}

export interface PharmaceuticalServicesData {
  eyebrow: string;
  title: string;
  subtitle: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  items: ServiceItem[];
}

export interface WhyChooseFeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: 'flask' | 'award' | 'truck' | 'heart';
}

export interface WhyChooseStatItem {
  id: string;
  value: string;
  label: string;
}

export interface PharmaceuticalWhyChooseUsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  highlightBadgeValue: string;
  highlightBadgeLabel: string;
  stats: WhyChooseStatItem[];
  features: WhyChooseFeatureItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
}

export interface PharmaceuticalTestimonialsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PharmaceuticalFaqData {
  eyebrow: string;
  title: string;
  subtitle: string;
  supportCaption: string;
  items: FaqItem[];
}

export interface PartnerLogoItem {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

export interface PharmaceuticalPartnersData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: PartnerLogoItem[];
}

export interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: 'phone' | 'mail' | 'map';
}

export interface PharmaceuticalContactData {
  eyebrow: string;
  title: string;
  subtitle: string;
  infoItems: ContactInfoItem[];
  hoursLabel: string;
  hoursValue: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  organizationLabel: string;
  organizationPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  successTitle: string;
  successMessage: string;
  resetButtonText: string;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface PharmaceuticalFooterData {
  logo: string;
  logoAlt: string;
  description: string;
  quickLinksTitle: string;
  quickLinks: FooterLinkItem[];
  usefulLinksTitle: string;
  usefulLinks: FooterLinkItem[];
  contactTitle: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  copyrightText: string;
}

export interface PageComponentEntry {
  key: string;
  component: string;
}

export interface PharmaceuticalTemplateData {
  common: {
    theme: ThemeConfig;
    Footer: PharmaceuticalFooterData;
  };
  categories: {
    Pharmaceutical: {
      sections: {
        Header: {
          variants: {
            PharmaceuticalHeader2: PharmaceuticalHeaderData;
          };
        };
        Hero: {
          variants: {
            PharmaceuticalHero2: PharmaceuticalHeroData;
          };
        };
        AboutUs: {
          variants: {
            PharmaceuticalAboutUs2: PharmaceuticalAboutUsData;
          };
        };
        Services: {
          variants: {
            PharmaceuticalServices2: PharmaceuticalServicesData;
          };
        };
        WhyChooseUs: {
          variants: {
            PharmaceuticalWhyChooseUs2: PharmaceuticalWhyChooseUsData;
          };
        };
        Testimonials: {
          variants: {
            PharmaceuticalTestimonials2: PharmaceuticalTestimonialsData;
          };
        };
        Faq: {
          variants: {
            PharmaceuticalFaq2: PharmaceuticalFaqData;
          };
        };
        Partners: {
          variants: {
            PharmaceuticalPartners2: PharmaceuticalPartnersData;
          };
        };
        Contact: {
          variants: {
            PharmaceuticalContact2: PharmaceuticalContactData;
          };
        };
      };
    };
  };
  pages: {
    home: {
      components: PageComponentEntry[];
    };
  };
}
