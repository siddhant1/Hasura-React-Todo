import React, { Component } from "react";
import {
  MARK_TODO_COMPLETE,
  GET_INCOMPLETE_TODOS,
  GET_ALL_TODOS
} from "../queries";
import { Mutation } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

class MarkTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Mutation
        mutation={MARK_TODO_COMPLETE}
        variables={this.props}
        refetchQueries={[
          { query: GET_INCOMPLETE_TODOS },
          { query: GET_ALL_TODOS }
        ]}
      >
        {(update_todos, { data }) => (
          <Button
            onClick={e => {
              e.preventDefault();
              update_todos();
            }}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
          </Button>
        )}
      </Mutation>
    );
  }
}

export default MarkTodo;
