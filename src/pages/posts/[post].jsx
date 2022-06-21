import Layout from '../../components/Layout';
import styled from 'styled-components';
import Router from 'next/router';
import { child, get, ref } from 'firebase/database';
import { database } from '../../services/firebase';

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

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(ctx) {
  const reference = ref(database);
  const article = await get(child(reference, 'posts')).then(snapshot => {
    return snapshot.val();
  });

  console.log(ctx);

  return {
    props: { article },
  };
}

const BgImg = styled.div`
  background-image: url('/post_bg.webp');
  background-size: cover;
  height: 300px;
  z-index: 2;
`;

const DocumentContainer = styled.article``;

export default function Post() {
  return (
    <Layout>
      <BgImg></BgImg>
      <DocumentContainer>
        <h1></h1>
      </DocumentContainer>
    </Layout>
  );
}
