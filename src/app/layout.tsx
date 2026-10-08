import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '[MY STUDY BUDDY] - Turn Any School Subject Into An Adventure',
  description:
    'An interactive AI learning application that transforms school concepts into age-appropriate, captivating stories followed by gentle comprehension checks for children ages 5-15.',
  keywords: [
    'children education',
    'AI storytelling',
    'educational stories',
    'kids quiz',
    'comprehension check',
    'science for kids',
    'gemini ai'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-[#FF6B9D] selection:text-black">
        {children}
      </body>
    </html>
  );
}
