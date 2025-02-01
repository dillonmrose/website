import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'allow',
});

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  output: 'standalone',
};

const withMDX = createMDX({});

export default withMDX(nextConfig);