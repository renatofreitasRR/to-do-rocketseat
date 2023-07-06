import { useState } from "react";

import Rocket from "./assets/rocket.svg";
import Todo from "./assets/todo.svg";
import ClipBoard from "./assets/clipboard.svg";
import Trash from "./assets/trash.svg";
import Check from "./assets/check.svg";
import CheckFill from "./assets/check_fill.svg";

import "./style.css";

type Task = {
  text: string;
  id: string;
  isComplete: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");

  function handleAddTask() {
    const inputValue = taskName;

    const newTask: Task = {
      text: inputValue,
      isComplete: false,
      id: Math.random().toString(),
    };

    setTasks((rest) => [...rest, newTask]);
    setTaskName("");
  }

  function handleDeleteTask(taskId: string) {
    const filterTasks = tasks.filter((task) => {
      return task.id != taskId;
    });

    setTasks(filterTasks);
  }

  function handleToggleCompleteTask(taskId: string) {
    const tasksUpdated = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedItem = {
          ...task,
          isComplete: !task.isComplete,
        };

        return updatedItem;
      }

      return task;
    });

    setTasks(tasksUpdated);
  }

  return (
    <main>
      <header className="header">
        <div className="header_logo">
          <img src={Rocket} />
          <img src={Todo} />
        </div>
        <form className="form">
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
          <button type="button" onClick={handleAddTask}>
            Criar +
          </button>
        </form>
      </header>
      <section className="section">
        <header className="titles">
          <div className="title">
            <strong className="title_text title_text_created">
              Tarefas criadas
            </strong>
            <div className="title_badge">
              <span>0</span>
            </div>
          </div>
          <div className="title">
            <strong className="title_text title_text_concluded">
              Concluídas
            </strong>
            <div className="title_badge">
              <span>0</span>
            </div>
          </div>
        </header>

        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task.id} className="task">
              <div className="task_container">
                {task.isComplete ? (
                  <img
                    src={CheckFill}
                    alt="Botão de lixeira para marcar tarefa como concluída"
                    onClick={() => handleToggleCompleteTask(task.id)}
                  />
                ) : (
                  <img
                    src={Check}
                    alt="Botão de lixeira para desmarcar tarefa como concluída"
                    onClick={() => handleToggleCompleteTask(task.id)}
                  />
                )}
                <span>{task.text}</span>
                <img
                  src={Trash}
                  alt="Botão de lixeira para exluir tarefa"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        {tasks.length == 0 && (
          <div className="no_data">
            <img src={ClipBoard} alt="Icone de prancheta de tarefas!" />
            <h4>Você ainda não tem tarefas cadastradas</h4>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </section>
    </main>
  );
}
