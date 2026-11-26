'use client';

import { useState } from 'react';
import { FiActivity, FiMinus, FiPlus } from 'react-icons/fi';
import { PharmaceuticalFaqData } from '@/types/templates.types';

interface FaqProps {
  data: PharmaceuticalFaqData;
}

export function Faq({ data }: FaqProps) {
  const [openId, setOpenId] = useState<string>(data.items[0]?.id ?? '');

  return (
    <section
      id="faq"
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

        <div className="mx-auto max-w-4xl space-y-3.5">
          {data.items.map((item, idx) => {
            const isOpen = openId === item.id;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={`${item.id}-${idx}`}
                className={`overflow-hidden rounded-xl border bg-[var(--color-card)] transition-colors ${
                  isOpen
                    ? 'border-[var(--color-primary)] shadow-sm'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-display-title flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                        isOpen
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--color-bg-soft)] text-[var(--color-primary)]'
                      }`}
                    >
                      {num}
                    </span>
                    <span className="font-display-title text-base font-bold text-[var(--color-heading)] sm:text-lg">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors ${
                      isOpen
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-bg-soft)] text-[var(--color-heading)]'
                    }`}
                  >
                    {isOpen ? <FiMinus className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[var(--color-border)] px-6 py-4 pl-[72px] text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-6 rounded-xl bg-[var(--color-primary-dark)] px-6 py-4 text-center text-sm font-medium text-slate-200">
            {data.supportCaption}
          </div>
        </div>
      </div>
    </section>
  );
}
