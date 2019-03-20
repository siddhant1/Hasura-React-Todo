import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  {
    todos {
      todo_id
      todo_text
      todo_completed
      todo_user
    }
  }
`;

export const GET_INCOMPLETE_TODOS = gql`
  {
    todos(where: { todo_completed: { _eq: false } }) {
      todo_id
      todo_text
      todo_completed
      todo_user
    }
  }
`;

export const GET_COMPLETE_TODOS = gql`
  {
    todos(where: { todo_completed: { _eq: true } }) {
      todo_id
      todo_text
      todo_completed
      todo_user
    }
  }
`;

export const INSERT_TODO_MUTATION = gql`
  mutation($objects: [todos_insert_input!]!) {
    insert_todos(objects: $objects) {
      affected_rows
    }
  }
`;

export const MARK_TODO_COMPLETE = gql`
  mutation($todo_id: Int!) {
    update_todos(
      where: { todo_id: { _eq: $todo_id } }
      _set: { todo_completed: true }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_TODO = gql`
  mutation($todo_id: Int!) {
    delete_todos(where: { todo_id: { _eq: $todo_id } }) {
      affected_rows
    }
  }
`;
