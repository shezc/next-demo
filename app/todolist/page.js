'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // 从localStorage加载todos
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 保存todos到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新任务
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // 切换任务完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 清空已完成的任务
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // 过滤任务
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 统计信息
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className={styles.container}>
      <div className={styles.todoApp}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo List</h1>
          <p className={styles.subtitle}>Stay organized and productive</p>
        </header>

        <form onSubmit={addTodo} className={styles.addForm}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className={styles.input}
            />
            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </div>
        </form>

        {todos.length > 0 && (
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({activeCount})
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </div>
        )}

        <ul className={styles.todoList}>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
              <div className={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className={styles.checkbox}
                />
                <span className={styles.todoText}>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={styles.deleteButton}
                title="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className={styles.emptyState}>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        )}

        {todos.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.stats}>
              <span>{activeCount} active, {completedCount} completed</span>
            </div>
            {completedCount > 0 && (
              <button onClick={clearCompleted} className={styles.clearButton}>
                Clear Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
