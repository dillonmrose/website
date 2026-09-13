import fs from 'fs';
import Link from "next/link";
import path from 'path';
import React from 'react';

export const getPosts = (directoryName: string) => {
  const directoryPath = path.join(process.cwd(), 'app', directoryName); // Ensure it's a string path

  try {
    const files = fs.readdirSync(directoryPath, { recursive: true, withFileTypes: true, });
    const posts = files.filter((file) => file.isDirectory()).map((file) => file.name);
    return posts.map((post)=> {
      return {
        name : post.replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase()),
        path : path.join(directoryName, post),
      }
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    return []; // Return an empty array on error
  }
};

interface PostsProps {
  directoryName: string;
}

export const Posts: React.FC<PostsProps> = ({ directoryName }) => {
  const posts = getPosts(directoryName); // Get posts from the directory

  return (
    <div>
      {posts.map((post) => (
        <div key={post.name} className="py-1.5">
          <Link
            className="text-base text-gray-700 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900"
            id={post.name}
            href={post.path}
          >
            {post.name}
          </Link>
        </div>
      ))}
    </div>
  );
};