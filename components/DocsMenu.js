import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocsMenu = () => {
  const router = useRouter();

  return (
    <Card className="bg-light p-2 rounded shadow-sm border-0">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <Link href="/docs" passHref className="text-decoration-none text-dark fs-3 fw-bold">Documentação</Link>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0 p-0 mb-2">
            <Link
              href="/docs/introduction"
              passHref
              className={`text-decoration-none d-block py-2 px-3 rounded transition ${
                router.pathname === '/docs/introduction' ? 'bg-primary text-white' : 'text-dark'
              }`}
              style={{ fontSize: '1.2rem', fontWeight: '500' }}
              aria-current={router.pathname === '/docs/introduction' ? 'page' : undefined}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> Introdução
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 p-0 mb-2">
            <Link
              href="/docs/endpoints"
              passHref
              className={`text-decoration-none d-block py-2 px-3 rounded transition ${
                router.pathname === '/docs/endpoints' ? 'bg-primary text-white' : 'text-dark'
              }`}
              style={{ fontSize: '1.2rem', fontWeight: '500' }}
              aria-current={router.pathname === '/docs/endpoints' ? 'page' : undefined}
            >
              <FontAwesomeIcon icon={faLink} className="me-2" /> Endpoints
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default DocsMenu;
