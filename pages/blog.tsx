import React from 'react';
import Layout from 'components/layout';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { NextPage } from 'next';

interface Post {
  title: string;
  date: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <div key={post.title}>
            <p>{post.title}</p>
            <p>{post.date}</p>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const blogs = readdirSync('./posts').map((file) => {
    const content = readFileSync(`./posts/${file}`, 'utf-8');
    const { data } = matter(content);

    return data;
  });
  console.log(blogs);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
