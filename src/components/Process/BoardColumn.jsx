import { TaskCard } from './TaskCard';
import {useState} from "react";

export function BoardColumn({ id, title, tasks, onDrop }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const taskNumber = e.dataTransfer.getData('taskNumber');
    onDrop(taskNumber, id);
    setIsDragOver(false);
  };

  return (
    <li
      className={`board__column ${isDragOver ? 'board__column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="board__column-header">
        <h2 className="board__column-title h3">{title}</h2>
        <span className="board__column-count">{tasks.length}</span>
      </header>

      <ul className="board__column-list">
        {tasks.length === 0 ? (
          <li className="board__column-item board__column-item--empty">
            No task yet.
          </li>
        ) : (
          tasks.map((task) => (
            <li key={task.number} className="board__column-item">
              <TaskCard
                number={task.number}
                title={task.title}
                description={task.description}
              />
            </li>
          ))
        )}
      </ul>
    </li>
  );
}
