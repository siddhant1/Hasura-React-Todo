import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { DELETE_TODO, GET_INCOMPLETE_TODOS, GET_ALL_TODOS } from "../queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

class DeleteTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_TODO}
        variables={this.props}
        refetchQueries={[
          { query: GET_INCOMPLETE_TODOS },
          { query: GET_ALL_TODOS }
        ]}
      >
        {(delete_todos, { data }) => (
          <Button
            onClick={e => {
              e.preventDefault();
              delete_todos();
            }}
          >
            <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteTodo;
