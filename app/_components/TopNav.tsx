import Link from "next/link";

export function TopNav() {  
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2">Dillon Rose</h1>
      <nav className="flex gap-6 p-4">
        <Link href="/" className="text-lg text-blue-500 hover:text-blue-700 transition-colors duration-200">Home</Link>
        <Link href="/resume" className="text-lg text-blue-500 hover:text-blue-700 transition-colors duration-200">Resume</Link>
        <Link href="/blog" className="text-lg text-blue-500 hover:text-blue-700 transition-colors duration-200">Blog</Link>
        <Link href="/bookreviews" className="text-lg text-blue-500 hover:text-blue-700 transition-colors duration-200">Book Reviews</Link>        
      </nav>
    </div>
  );
}
