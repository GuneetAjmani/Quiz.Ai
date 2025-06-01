import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Professional Quiz',
  description: 'Test your professional knowledge with our interactive quizzes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}