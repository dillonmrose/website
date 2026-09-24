export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="md:-mx-10 pt-6">{children}</div>;
}
