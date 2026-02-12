import { BlogPost } from '../types';
import { BATCH_1_POSTS } from './batch-1';
import { BATCH_2_POSTS } from './batch-2';
import { BATCH_3_POSTS } from './batch-3';
import { BATCH_4_POSTS } from './batch-4';

/**
 * All new blog posts combined from batch files.
 * These are imported into constants.tsx and merged with the original 6 posts.
 */
export const NEW_BLOG_POSTS: BlogPost[] = [
  ...BATCH_1_POSTS,
  ...BATCH_2_POSTS,
  ...BATCH_3_POSTS,
  ...BATCH_4_POSTS,
];
