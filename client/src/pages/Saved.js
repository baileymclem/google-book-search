import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Saved() {
  const [book, setBook] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getBook(id)
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <Col size="md-6 sm-12">
    <Jumbotron>
      <h1>Books On My List</h1>
    </Jumbotron>
    {books.length ? (
      <List>
        {books.map(book => (
          <ListItem key={book._id}>
            <Link to={"/books/" + book._id}>
              <strong>
                {book.title} by {book.author}
              </strong>
            </Link>
            <DeleteBtn onClick={() => deleteBook(book._id)} />
          </ListItem>
        ))}
      </List>
    ) : (
      <h3>No Results to Display</h3>
    )}
  </Col>
    );
  }


export default Saved;
