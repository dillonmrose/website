import fs from 'fs';
import Link from "next/link";
import path from 'path';
import React from 'react';

export const getPosts = (directoryName: string) => {
  const directoryPath = path.join(process.cwd(), 'app', directoryName); // Ensure it's a string path

  try {
    const files = fs.readdirSync(directoryPath, { recursive: true, withFileTypes: true, });
    var posts = files.filter((file) => file.isDirectory()).map((file) => file.name);
    return posts.map((post)=> {
      return {
        name : post.replace('_', ' '),
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
      <h1 className="font-medium pt-12 transition-element">
        {posts.map((post)=> <div><Link id={post.name} href={post.path}>{post.name}</Link><br /></div>)}
        <br />
        {directoryName} {/* Display the directory name */}
      </h1>
    </div>
  );
};