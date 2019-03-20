import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { GET_INCOMPLETE_TODOS, INSERT_TODO_MUTATION } from "../queries";
class AddTodos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_text: "",
      todo_user: localStorage.getItem("sub")
    };
  }

  render() {
    return (
      <Mutation
        mutation={INSERT_TODO_MUTATION}
        variables={{ objects: [this.state] }}
        refetchQueries={[{ query: GET_INCOMPLETE_TODOS }]}
      >
        {(insert_todo, { data }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              insert_todo();
            }}
          >
            <FormGroup
              controlId="Createtodo"
              style={{ "margin-bottom": "0px" }}
            >
              <InputGroup>
                <FormControl
                  type="text"
                  value={this.state.todo_text}
                  placeholder="Create a todo task."
                  onChange={e => this.setState({ todo_text: e.target.value })}
                />
                <InputGroup.Button>
                  <Button type="submit">
                    <FontAwesomeIcon icon={faPlus} style={{ color: "blue" }} />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default AddTodos;
