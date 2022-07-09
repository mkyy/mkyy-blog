import Layout from '../../components/Layout';
import styled from 'styled-components';
import Router from 'next/router';
import { child, get, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import Head from 'next/head';

export const getStaticPaths = async () => {
  const reference = ref(database);
  const data = await get(child(reference, 'posts')).then(snapshot => {
    return snapshot.val();
  });

  const paths = Object.keys(data).map(key => {
    return {
      params: { post: key },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(ctx) {
  const key = await ctx.params.post;
  const post = await (await get(child(ref(database), `posts/${key}`))).val();

  return {
    props: { params: post },
  };
}

const BgImg = styled.div`
  background-image: url('/post_bg.webp');
  background-size: cover;
  background-position: 0 40%;
  height: 200px;
  z-index: 1;
  position: relative;

  &::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(53, 50, 117, 1) 10%, rgba(0, 0, 0, 0) 100%);
  }
`;

const DocumentContainer = styled.article`
  background-color: #fafafa;
  min-height: 600px;
  h1 {
    text-align: center;
    font-family: 'Dosis';
  }
`;

export default function Post({ params }) {
  console.log(params);
  return (
    <>
      <Head>
        <title>{params.title} - Mkyy Blog</title>
        <meta name='description' content={params.body.slice(0, 155)} />
      </Head>

      <Layout>
        <BgImg></BgImg>
        <DocumentContainer>
          <h1>{params.title}</h1>
          <p>{params.body}</p>
        </DocumentContainer>
      </Layout>
    </>
  );
}
