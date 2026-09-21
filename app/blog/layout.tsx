export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="-mx-2 md:mx-0 pt-6">{children}</div>;
}
