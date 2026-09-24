import "./globals.css";
import { TopNav } from "./_components/TopNav";
import { type Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dillon Rose",
    template: "%s",
  },
  description: "Dillon Rose's Personal Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en" className={inter.className}>
        <body className="antialiased text-gray-900 bg-white">
          <TopNav />
          <main className="max-w-4xl mx-auto px-6 py-10 pt-14">
            {children}
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: 'x', url: 'https://x.com/_Dillon_Rose_' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/dillonmrose' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}