import "./globals.css";
import { TopNav } from "./_components/TopNav";
import { type Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "DIllon Rose",
  description: "Dillon Rose's Personal Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full">
        <body>
          <main className="h-full min-h-full">
            <TopNav />
            <div className="flex flex-col items-center h-screen">
              {children}
            </div>
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