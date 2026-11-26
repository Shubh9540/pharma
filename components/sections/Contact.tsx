'use client';

import { FormEvent, useState } from 'react';
import { FiActivity, FiArrowRight, FiCheckCircle, FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { ContactInfoItem, PharmaceuticalContactData } from '@/types/templates.types';

interface ContactProps {
  data: PharmaceuticalContactData;
}

function renderContactIcon(icon: ContactInfoItem['icon']) {
  switch (icon) {
    case 'phone':
      return <FiPhone className="h-5 w-5" />;
    case 'mail':
      return <FiMail className="h-5 w-5" />;
    case 'map':
    default:
      return <FiMapPin className="h-5 w-5" />;
  }
}

export function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOrganization('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
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

        <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {data.infoItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.href}
              className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition-colors hover:border-[var(--color-primary)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--color-primary)] text-white">
                {renderContactIcon(item.icon)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  {item.label}
                </div>
                <div className="font-display-title mt-0.5 truncate text-sm font-bold text-[var(--color-heading)] sm:text-base">
                  {item.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto max-w-4xl rounded-xl border border-[var(--color-border)] border-t-4 border-t-[var(--color-primary)] bg-[var(--color-card)] p-6 shadow-sm sm:p-10">
          {submitted ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <FiCheckCircle className="h-12 w-12 text-[var(--color-primary)]" />
              <h3 className="font-display-title mt-4 text-2xl font-bold text-[var(--color-heading)]">
                {data.successTitle}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text)]">
                {data.successMessage}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                {data.resetButtonText}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col justify-between gap-2 border-b border-[var(--color-border)] pb-4 sm:flex-row sm:items-center">
                <h3 className="font-display-title text-xl font-bold text-[var(--color-heading)]">
                  {data.formTitle}
                </h3>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
                  <FiClock className="h-4 w-4 text-[var(--color-primary)]" />
                  <span>{data.hoursValue}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]"
                  >
                    {data.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={data.namePlaceholder}
                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-[var(--color-card)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]"
                  >
                    {data.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.emailPlaceholder}
                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-[var(--color-card)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-org"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]"
                  >
                    {data.organizationLabel}
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={data.organizationPlaceholder}
                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-[var(--color-card)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]"
                >
                  {data.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={data.messagePlaceholder}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-[var(--color-card)]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                <span>{data.submitText}</span>
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
