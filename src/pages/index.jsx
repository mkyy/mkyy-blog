import Link from 'next/link';
import { database } from '../services/firebase';
import { ref, get, child } from 'firebase/database';
import Layout from '../components/Layout';
import { Container, Row, Col, Card, CardImg, Button } from 'react-bootstrap';
import All from '../assets/all.svg';
import Destaque from '../assets/destaque.svg';

export async function getStaticProps() {
  const reference = ref(database);
  let allPosts = [];
  const principalPosts = [];
  const randomIndexs = [];

  const data = await get(child(reference, 'posts')).then(snapshot => {
    return snapshot.val();
  });

  // populating allPosts with all the posts
  for (let key in data) {
    allPosts.push({
      ...data[key],
    });
  }

  // getting 3 random different posts to show on the homepage
  if (allPosts.length >= 3) {
    while (randomIndexs.length < 3) {
      const randomIndex = Math.floor(Math.random() * allPosts.length);
      if (!randomIndexs.includes(randomIndex)) {
        randomIndexs.push(randomIndex);
        principalPosts.push(allPosts[randomIndex]);
      }
    }
  }

  return {
    props: { posts: allPosts, principalPosts: principalPosts },
  };
}

export default function Home({ posts, principalPosts }) {
  return (
    <Layout>
      <Container>
        <div className='header-wrapper'>
          <Destaque />
          <h1>Destaques</h1>
        </div>
        <Row>
          {principalPosts.map((post, idx) => {
            return (
              <Link load key={post.id} href={`/posts/${post.id}`}>
                <Col xl={4} md={6} sm={6} xs={12} key={post.id}>
                  <Card className='my-4 post-principal shadow-box grow'>
                    <CardImg src={post.thumbnail} alt={`${post.title}`} height={200} />
                    <Card.Body>
                      <Card.Title className='title'>{post.title}</Card.Title>
                      <Card.Text className='body'>{post.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            );
          })}
          <div className='btn-container' style={{ justifyContent: 'center' }}>
            <Button>
              <Link href={'/posts'}>Veja mais</Link>
            </Button>
          </div>

          <div className='header-wrapper'>
            <All />
            <h1>Últimas publicações</h1>
          </div>
          <Col md={10}>
            {posts.map(post => {
              return (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <Card className='post-generic my-4 mx-4 shadow-box grow'>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Img className='img' src={post.thumbnail} alt={`${post.title}`} />
                        </Col>
                        <Col xs={9}>
                          <Card.Title className='title'>{post.title}</Card.Title>
                          <Card.Text className='body'>{post.body}</Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
