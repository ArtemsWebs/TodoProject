import React, { useMemo } from 'react';
import { Todo } from './TypeIntefice';
import styled from 'styled-components';

const Input = styled.input`
  border: 0;
  background: bottom;
  font-size: 20px;
  margin: 0px 10px;
  font-family: Bradley Hand, sans-serif;
  font-style: italic;

  :focus-visible {
    outline: none;
  }
`;
const InputCheck = styled(Input)`
  background: white;
  border-radius: 8px;
  box-shadow: 4px 1px 27px 21px rgba(247, 233, 145, 0.4) inset;
  font-size: 20px;
  margin-left: 10px;
  font-family: Bradley Hand, sans-serif;
  font-style: italic;
`;

const TodoList = ({ todo, editTodo, deleteTodo, editToogle, cur_input }) => {
  const local_todo: Todo[] = useMemo((): Todo[] => {
    let local_todo = todo.filter((t) => {
      return t.value.startsWith(cur_input);
    });
    return local_todo;
  }, [cur_input, todo]);

  return (
    <ul className="list-group list-group-flush ul-p-t-200">
      {local_todo.map((t) => {
        return (
          <li className="list-group-item li-bg" key={t.id}>
            <input type="checkbox" onChange={(e) => editToogle(t.id, e.currentTarget.checked)} />
            {t.chStatus ? (
              <InputCheck value={t.content} onChange={(e) => editTodo(t.id, e.target.value)} autoFocus={true} />
            ) : (
              <Input value={t.content} onChange={(e) => editTodo(t.id, e.target.value)} />
            )}
            <button className="btn btn-outline-danger" onClick={() => deleteTodo(t.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default TodoList;
