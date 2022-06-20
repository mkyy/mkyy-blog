import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

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

  const { createPost } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    const post = {
      title: title,
      body: body,
      thumbnail: thumbnail,
    };

    createPost(post);
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
