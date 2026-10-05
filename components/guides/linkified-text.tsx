import { Fragment } from 'react';
import Link from 'next/link';

const urlPattern = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/g;
const trailingPunctuation = /[.,،؛:!?؟)\]}]+$/;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitWithTermLinks(
  text: string,
  links: { term: string; href: string; external?: boolean }[] = [],
) {
  if (links.length === 0) return [text];

  const terms = links
    .map((link) => link.term)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  const pattern = new RegExp(`(${terms.join('|')})`, 'gi');

  return text.split(pattern);
}

export function LinkifiedText({
  text,
  internalLinks = [],
  externalLinks = [],
}: {
  text: string;
  internalLinks?: { term: string; href: string }[];
  externalLinks?: { term: string; href: string }[];
}) {
  const safeText = text.replace(/<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>.*?<\/a>/gi, '$1');
  const lines = safeText.split('\n');
  const termLinks = [
    ...internalLinks.map((link) => ({ ...link, external: false })),
    ...externalLinks.map((link) => ({ ...link, external: true })),
  ];

  return (
    <p>
      {lines.map((line, lineIndex) => (
        <Fragment key={`${lineIndex}-${line.slice(0, 20)}`}>
          {line.split(urlPattern).map((part, partIndex) => {
            if (!/^(https?:\/\/|www\.)/.test(part)) {
              return (
                <Fragment key={`${partIndex}-${part.slice(0, 20)}`}>
                  {splitWithTermLinks(part, termLinks).map((piece, pieceIndex) => {
                    const termLink = termLinks.find(
                      (link) => link.term.toLocaleLowerCase() === piece.toLocaleLowerCase(),
                    );

                    if (!termLink) return piece;

                    if (termLink.external) {
                      return (
                        <a
                          key={`${pieceIndex}-${piece}`}
                          href={termLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {piece}
                        </a>
                      );
                    }

                    return (
                      <Link key={`${pieceIndex}-${piece}`} href={termLink.href}>
                        {piece}
                      </Link>
                    );
                  })}
                </Fragment>
              );
            }

            const punctuation = part.match(trailingPunctuation)?.[0] ?? '';
            const url = punctuation ? part.slice(0, -punctuation.length) : part;
            const href = url.startsWith('http') ? url : `https://${url}`;

            return (
              <Fragment key={`${partIndex}-${url}`}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
                {punctuation}
              </Fragment>
            );
          })}
          {lineIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}
