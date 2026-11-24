import type { ReactNode } from 'react';

interface SectionHeadingProps {
  num?: string;
  label?: string;
  title: string;
  as?: 'h2' | 'h3';
  size?: 'lg' | 'md';
  children?: ReactNode;
}

function SectionHeading({ num, label, title, as: Tag = 'h2', size = 'lg', children }: SectionHeadingProps) {
  return (
    <div className="studio-heading lc-reveal">
      {(num || label) && (
        <p className="lc-eyebrow">
          <span className="lc-eyebrow__num">{num}</span> / {label}
        </p>
      )}
      <Tag className={`studio-heading__title font-bold${size === 'md' ? ' studio-heading__title--compact' : ''}`}>
        {title}
      </Tag>
      <span className="lc-rail" aria-hidden="true">
        <span className="lc-rail__dot" />
      </span>
      {children}
    </div>
  );
}

export default SectionHeading;
