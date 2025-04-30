import React from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchData = () => {
    axios("https://my-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        const data = response.data;

        if (data) {

          const taskArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setTasks(taskArray);
        } else {
          setTasks([]); 
        }
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Task List</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
