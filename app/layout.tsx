import "./globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { TopNav } from "./_components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dillon Rose",
    template: "%s",
  },
  description: "Dillon Rose's Personal Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en" className={inter.className}>
        <body className="antialiased text-gray-900 bg-white">
          <TopNav />
          <main className="max-w-4xl mx-auto px-6 py-10 pt-14">{children}</main>
        </body>
      </html>
    </ViewTransitions>
  );
}
