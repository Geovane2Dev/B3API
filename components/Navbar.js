import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const BoostrapNavbar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="py-3 shadow-sm">
      <Container>
        <Link href="/" className="text-decoration-none">
          <Navbar.Brand className="d-flex align-items-center">
            <img src="/B3API.png" width="50" height="50" alt="B3API logo" />
            <div className="fw-bold ms-3 text-uppercase">B3API</div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Item className="me-3">
              <Link href="/docs" passHref className="btn btn-primary rounded-pill px-4 py-3 text-uppercase" style={{ fontSize: '1rem', fontWeight: '600' }}>Documentação</Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                href="https://github.com/Geovane2Dev/B3API"
                passHref
                className="nav-link d-flex align-items-center"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span className="ms-2">GitHub</span>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BoostrapNavbar;
