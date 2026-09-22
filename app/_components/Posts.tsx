import fs from 'fs';
import Link from "next/link";
import path from 'path';
import React from 'react';

export const getPosts = (directoryName: string) => {
  const directoryPath = path.join(process.cwd(), 'app', directoryName);

  try {
    const files = fs.readdirSync(directoryPath, { recursive: true, withFileTypes: true });
    const posts = files.filter((file) => file.isDirectory()).map((file) => file.name);
    return posts
      .map((post) => {
        const metaPath = path.join(directoryPath, post, 'meta.json');
        let date = '';
        let sortDate = '';
        let title = '';
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
          date = meta.date ?? '';
          sortDate = meta.sortDate ?? '';
          title = meta.title ?? '';
        } catch {}
        return {
          name: title || post.replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase()).replace('--', ': '),
          path: `/${directoryName}/${post}`,
          date,
          sortDate,
        };
      })
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
};

interface PostsProps {
  directoryName: string;
}

export const Posts: React.FC<PostsProps> = ({ directoryName }) => {
  const posts = getPosts(directoryName);

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.name}>
          {post.date && <p className="text-xs text-gray-400 mb-1">{post.date}</p>}
          <Link
            className="text-lg font-medium text-gray-800 hover:text-gray-500 transition-colors"
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
