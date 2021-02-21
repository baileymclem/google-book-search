import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


function Search() {
  // Setting our component's initial state
  const [reslist, setReslist] = useState({})
  const [formObject, setFormObject] = useState({})
  const [book, setBook] = useState({})





  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };


  function handleFormSubmit(event) {
    event.preventDefault();
    const title = formObject.title;


      API.googleBooks(title)
        .then(res => {
          console.log("res", res);
          setReslist(res.data.items)
        })
        .catch(err => console.log(err));
    }

    return (
      <Container fluid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Google Book Search</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>

            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {reslist.length ? (
              <List>
                {reslist.map(book => {
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
                      link = book.volumeInfo.previewLink
                  } else {
                      link = ""
                  }


                  return (
                  <ListItem key={book.id}>

                      <strong>
                        {title} by {authors}
                      </strong>

                      <h3>Description</h3>
                      <p>
                        {description}
                      </p>
                     <img src={image} />
                     {link}

                  </ListItem>


                )

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
