export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
            <div className="flex flex-col h-screen p-32">
              {children}
            </div>
  );
}
