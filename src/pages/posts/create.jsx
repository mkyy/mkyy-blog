import styled from 'styled-components';
import Layout from '../../components/Layout';
import { Modal } from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Router from 'next/router';
import { errorPrefix } from '@firebase/util';

const CreateContainer = styled.section`
  max-width: 500px;
  margin-inline: auto;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export default function Create() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const { createPost, isAdmin } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    try {
      if (isAdmin) {
        const post = {
          title: title,
          body: body,
          thumbnail: thumbnail,
        };
        createPost(post);
      }
    } catch (error) {
      return (
        <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>{errorPrefix}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{error(title)}</h4>
            <p>{error(body)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => Router.push('/')}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  return (
    <Layout>
      <CreateContainer>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <label htmlFor='image'>Thumb</label>
          <input
            type='text'
            name='thumbnail'
            id='thumbnail'
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
          />
          <label htmlFor='body'>Body</label>
          <textarea id='body' value={body} onChange={e => setBody(e.target.value)} />
          <button type='submit'>Criar Post</button>
        </form>
      </CreateContainer>
    </Layout>
  );
}
