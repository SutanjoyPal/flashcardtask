import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GiNotebook } from "react-icons/gi";
import Nav from 'react-bootstrap/Nav';

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <GiNotebook size={40} />{' '}
          takeuFlashCards
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/"><b>Home</b></Nav.Link>
          <Nav.Link href="/admin"><b>Admin</b></Nav.Link>
        </Nav>


      </Container>
    </Navbar>
  );
}