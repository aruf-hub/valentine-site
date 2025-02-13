// app/layout.tsx

import './globals.css';  // Global styles
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Valentine's Day Proposal</title>
        <meta name="description" content="A special Valentine's Day proposal" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
