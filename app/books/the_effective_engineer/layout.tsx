export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="flex flex-col h-screen pl-32 pr-32">
        {children}
      </div>
  );
}
