import { TaskCard } from './TaskCard';

export function BoardColumn({ title, tasks }) {
  return (
    <li className="board__column">
      <header className="board__column-header">
        <h2 className="board__column-title h3">{title}</h2>
        <span className="board__column-count">{tasks.length}</span>
      </header>

      <ul className="board__column-list">
        {tasks.length === 0 ? (
          <li className="board__column-item board__column-item--empty">
            Waiting for the task...
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
