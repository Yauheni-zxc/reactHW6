import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasksAsync, addTask, removeTask, toggleTask } from '../features/tasks/tasksSlice';

export const TasksList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    dispatch(loadTasksAsync());
  }, [dispatch]);

  const handleAddTask = () => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    dispatch(addTask({ id: newId, title: newTaskTitle, completed: false }));
    setNewTaskTitle('');
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  return (
    <>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Название новой задачи"
      />
      <button onClick={handleAddTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task) => (
          <li className='list' key={task.id}>
            {task.title} - {task.completed ? 'Выполнено' : 'Не выполнено'}
            <div className='btn'>
            <button onClick={() => handleToggleTask(task.id)}>
              {task.completed ? 'Отменить выполнение' : 'Завершить задачу'}
            </button>
            <button onClick={() => handleRemoveTask(task.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};