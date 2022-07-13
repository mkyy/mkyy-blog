import Layout from '../../components/Layout';
import styled from 'styled-components';
import { child, get, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import Head from 'next/head';
import { Button, Modal, Container } from 'react-bootstrap';
import Router from 'next/router';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContext';

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
    props: { params: post, comments: post.comments },
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
  padding-top: 30px;
  h1 {
    text-align: center;
    font-family: 'Dosis';
    color: var(--golden);
  }

  .body-text {
    color: #666;
  }
`;

const CommentsWrapper = styled.section``;

export default function Post(props) {
  const { createComment, isLoggedIn } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const commentRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    if (isLoggedIn()) {
      const commentObj = {
        body: commentRef.current.value,
      };
      createComment(Router.asPath, commentObj);
      commentRef.current.value = '';
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Head>
        <title>{props.params.title} - Mkyy Blog</title>
        <meta name='description' content={props.params.body.slice(0, 155)} />
      </Head>

      <Layout>
        <BgImg></BgImg>
        <DocumentContainer>
          <Container>
            <h1>{props.params.title}</h1>
            <p className='body-text'>{props.params.body}</p>

            <CommentsWrapper>
              <h2>Comentários</h2>
              {Object.keys(props.comments).map(comment => (
                <p key={comment}>{props.params.comments[comment].body}</p>
              ))}
              <div className='comment-box'>
                <form onSubmit={e => handleSubmit(e)}>
                  <textarea
                    ref={commentRef}
                    id='comment'
                    placeholder='digite seu comentário aqui...'
                  />
                  <button type='submit'>Comentar</button>
                </form>
                <Modal
                  show={showModal}
                  size='lg'
                  aria-labelledby='contained-modal-title-vcenter'
                  centered
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                      Você precisa estar logado para comentar.
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Faça login para continuar.</Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => Router.push('/login')}>Sign-in</Button>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </CommentsWrapper>
          </Container>
        </DocumentContainer>
      </Layout>
    </>
  );
}
