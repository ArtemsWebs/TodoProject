import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './img/notepad.png';
import { Todo } from './TypeIntefice';
import TodoList from './TodoList';
import axios from 'axios';

//Styled-Component
const Input = styled.input`
  margin: 30px auto;
  width: 60%;
  height: 50px;
  padding-left: 10px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 1px 9px 2px rgba(34, 60, 80, 0.6), 0 1px 9px 2px rgba(34, 60, 80, 0.6) inset;
  font-size: 20px;
  font-size: 13px;
`;

const Main = styled.div`
  background: #fff;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const TaskContainer = styled(InputContainer)`
  background-image: url(${Note});
  background-size: cover;
  min-height: 800px;
  width: 63%;
  margin: 0 auto;
`;

const TodoForm = () => {
  //UseState
  let [todos, setTodos] = useState<Todo[]>([]);
  let [input, setInputState] = useState<string>('');


  const getTodo=async ()=>{
    await axios.get<Todo[]>('http://localhost:5000/todo/get_todo').then((response)=>{
      setTodos(response.data);
    });
  };


  useEffect(() => {
    //Добавляем элементы из local
    getTodo();
  }, []);

  //добавляет элементы в localStorage, грубо говоря действия выполняються
  //до рендеринга
  useEffect( () => {
    let ourTodos: Todo[]=todos.slice();
    axios.post('http://localhost:5000/todo/add_todo', {todo:ourTodos.slice(-1)});
  }, [todos]);

  //Функции реализующие изменения state, изменяет пол
  const editTodo = (id: number, task: string): void => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id && todo.chStatus) return { ...todo, value: task };
        return { ...todo };
      }),
    );
  };

  const deleteTodo = (id: number): void => {
    let currentItem: Todo | undefined = todos.find((t) => t.id === id);
    if (currentItem?.chStatus === true) setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const editToogle = (id: number, check: boolean): void => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, chStatus: check };
        }
        return { ...todo };
      }),
    );
  };
  const setInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputState(event.target.value);
  };

  const keyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && input) {
      const newTodo: Todo = {
        id: Date.now(),
        date: Date.now().toString(),
        content:input,
        chStatus: false,
      };
      //Берем в расчет предидущее состояния todo

      if (!todos.filter((t) => t.content === input).length) setTodos((prev) => [newTodo, ...prev]);
      setInputState('');
    }
  };

  //Отрисовка
  return (
    <Main>
      <InputContainer>
        <Input placeholder="Введите задачу..." value={input} onChange={setInput} onKeyPress={keyPressEnter} />
      </InputContainer>
      <TaskContainer>
        <TodoList todo={todos} editTodo={editTodo} deleteTodo={deleteTodo} editToogle={editToogle} cur_input={input} />
      </TaskContainer>
    </Main>
  );
};
export default TodoForm;
