import React, { useState } from "react";
import API from "../utils/API";
import { Col, Row, Container, Card } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Search() {
  const [reslist, setReslist] = useState({});
  const [formObject, setFormObject] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function addBook(key, title, authors, description, image, link) {
    API.saveBook({
      key: key,
      title: title,
      authors: authors,
      description: description,
      image: image,
      link: link,
    }).catch((err) => console.log(err));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const title = formObject.title;

    API.googleBooks(title)
      .then((res) => {
        console.log("res", res);
        setReslist(res.data.items);
      })
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

          <form>
            <Card className="text-center" border="dark">
              <Card.Body>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Search for a book title"
                />
                <FormBtn
                  disabled={!formObject.title}
                  onClick={handleFormSubmit}
                >
                  Search
                </FormBtn>
              </Card.Body>
            </Card>
          </form>
          <br />

          {reslist.length ? (
            <List>
              {reslist.map((book) => {
                let id = "";
                id = book.id;
                let title = "";
                if (book.volumeInfo.title === undefined) {
                  title = "No Title";
                } else {
                  title = book.volumeInfo.title;
                }
                let authors = [];
                if (book.volumeInfo.authors === undefined) {
                  authors = ["No Author"];
                } else {
                  authors = book.volumeInfo.authors;
                }
                let description = "";
                if (book.volumeInfo.description) {
                  description = book.volumeInfo.description;
                } else {
                  description = "No description.";
                }
                let image = "";
                if (book.volumeInfo.imageLinks === undefined) {
                  image = "https://placehold.it/128x128";
                } else {
                  image = book.volumeInfo.imageLinks.thumbnail;
                }
                let link = "";
                if (book.volumeInfo.previewLink) {
                  link = book.volumeInfo.previewLink;
                } else {
                  link = "";
                }

                return (
                  <ListItem key={id}>
                    <h3>
                      {title} by {authors}
                    </h3>

                    <strong>Description</strong>
                    <p>{description}</p>
                    <p>
                      <img src={image} />
                    </p>
                    <p>{link}</p>

                    <button
                      onClick={() =>
                        addBook(id, title, authors, description, image, link)
                      }
                    >
                      Save Book
                    </button>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default Search;
