import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_TODOS } from "../queries";
import MarkTodo from "./MarkTodo";
import DeleteTodo from "./DeleteTodo";
import {
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { client } from "./Home";
import { ApolloProvider } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class GetAllTodos extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      isAuthenticated() && (
        <ApolloProvider client={client}>
          <div className="container">
            <h2 style={{ textAlign: "center" }}>All Todos</h2>
            <h3 style={{ textAlign: "center" }}>
              Todos in Green Are Completed while in Red are Pending
            </h3>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <Query query={GET_ALL_TODOS}>
                    {({ loading, error, data }) => {
                      if (loading)
                        return (
                          <h2>
                            Loading...{" "}
                            <FontAwesomeIcon
                              icon={faSpinner}
                              style={{ color: "blue" }}
                              spin
                            />
                          </h2>
                        );
                      if (error) return `Error fetching todos.`;
                      let count = 0;
                      return (
                        <div>
                          <ListGroup>
                            {data.todos.map(todo => (
                              <ListGroupItem
                                bsStyle={
                                  todo.todo_completed ? "success" : "danger"
                                }
                              >
                                <ButtonGroup className="pull-right">
                                  {!todo.todo_completed && (
                                    <MarkTodo todo_id={todo.todo_id} />
                                  )}
                                  <DeleteTodo todo_id={todo.todo_id} />
                                </ButtonGroup>
                                <h4>
                                  {(count = count + 1)}. {todo.todo_text}
                                </h4>
                              </ListGroupItem>
                            ))}
                          </ListGroup>
                        </div>
                      );
                    }}
                  </Query>
                </Col>
              </Row>
            </Grid>
          </div>
        </ApolloProvider>
      )
    );
  }
}

export default GetAllTodos;
