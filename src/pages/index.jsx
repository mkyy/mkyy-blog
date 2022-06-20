import Link from 'next/link';
import { database } from '../services/firebase';
import { ref, get, child } from 'firebase/database';
import Layout from '../components/Layout';
import { Container, Row, Col, Card, CardImg } from 'react-bootstrap';

export async function getStaticProps() {
  const reference = ref(database);
  let array = [];

  const data = await get(child(reference, 'posts')).then(snapshot => {
    return snapshot.val();
  });

  for (let key in data) {
    array.push({
      ...data[key],
    });
  }

  return {
    props: { posts: array },
  };
}

export default function Home({ posts }) {
  return (
    <Layout>
      <Container>
        <Row>
          {posts.map(post => {
            return (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Col xl={6} md={6} sm={12} className='my-4 post' key={post.id}>
                  <Card>
                    <CardImg src={post.thumbnail} alt={`${post.title}`} />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
