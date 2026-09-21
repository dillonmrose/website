import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from 'next-view-transitions';

type ImageProps = ComponentPropsWithoutRef<'img'>;

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-2xl font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-100" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-1 uppercase tracking-wide" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-base leading-relaxed text-gray-700 my-2" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-700 list-decimal pl-6 space-y-1.5 text-base my-3" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-700 list-disc pl-6 space-y-1.5 text-base my-3" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900 transition-colors';
    if (href?.endsWith('png') || href?.endsWith('PNG')) {
      return (
        <img src={href} className="max-w-full h-auto my-4 rounded" />
      );
    }
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, style, className, ...props }: ImageProps) => (
    <img src={src} alt={alt} style={{ height: 'auto', ...style }} className={`my-4 rounded ${className ?? 'w-full'}`} {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-2 border-gray-200 pl-4 text-gray-500 italic my-4"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
