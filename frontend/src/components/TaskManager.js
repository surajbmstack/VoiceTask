import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setTaskText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/tasks', { text: taskText }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskText('');
      resetTranscript();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening();
    setIsListening(true);
    setTimeout(()=>{
        setIsListening(false)
    },5000)
  

  };

 

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" value={taskText} readOnly placeholder="Say a task..." />
        <button type="button" onClick={startListening}>Start Listening</button>
        <button type="submit">Add Task</button>
      </form>
      {isListening && <p>Now Listening...</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text} <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
