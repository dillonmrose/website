import Link from "next/link";

export function TopNav() {  
  return (
    <div className="w-full">
      <h1 className="flex w-full justify-center text-5xl font-bold border-b-2 border-gray-300 pb-2 pl-2 pt-20">Dillon Rose</h1>
      <nav className="flex justify-center gap-6 pl-4 pr-4 pb-6">
        <Link href="/" className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-200">Home</Link>
        <Link href="/resume" className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-200">Resume</Link>
        <Link href="/blog" className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-200">Blog</Link>
        <Link href="/books" className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-200">Books</Link>        
      </nav>
    </div>
  );
}
