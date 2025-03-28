import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from 'next-view-transitions';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-gray-800 font-medium mb-0 fade-in text-4xl pb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-gray-800 font-medium mt-8 mb-3 text-3xl" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-gray-900 font-medium mb-3 text-2xl" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-blue-500 font-medium" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-grey-500 leading-snug text-xl flex p-1" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-800 list-decimal pl-10 space-y-2 text-xl" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 list-disc pl-10 space-y-1 text-xl" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-4 text-xl" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700 transition-colors duration-200';
    if (href?.endsWith('png')) {
      return (
        <img src={href} className="flex h-48 md:h-96 pl-4 pr-4"/>
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
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
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
