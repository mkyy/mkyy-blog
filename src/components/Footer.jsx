import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #292356;
  height: 200px;

  ul {
    list-style-type: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <Col>
            <h3>Links</h3>
            <ul>
              <li>Home</li>
              <li>Perfil</li>
              <li>Posts</li>
            </ul>
          </Col>
          <Col>
            <h3>Contato</h3>
            <ul>
              <li>Linkedin</li>
              <li>Github</li>
              <li>Website</li>
              <li>Whatsapp</li>
              <li>Telegram</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};
export default Footer;
