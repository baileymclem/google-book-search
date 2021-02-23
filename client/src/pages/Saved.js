import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Card } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Saved() {
  const [books, setBooks] = useState({});

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col>

          <br />
          <Card className="text-center" border="dark">
            <Card.Body>
              <h1>Google Book Search</h1>
            </Card.Body>
          </Card>
          <br />

          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <h3>
                    {book.title} by {book.authors}
                  </h3>

                  <strong>Description</strong>
                  <p>{book.description}</p>
                  <p>
                    <img src={book.image} />
                  </p>
                  <p>{book.link}</p>

                  <button onClick={() => deleteBook(book._id)}>
                    Delete Book
                  </button>
                </ListItem>

              ))}
            </List>

          ) : (
            <h3>No Results to Display</h3>

          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
