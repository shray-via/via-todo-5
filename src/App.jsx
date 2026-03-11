import { useState, useEffect, useRef } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)

  // Load tasks from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTasks(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved tasks:', e)
      }
    }
  }, [])

  // Save tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = newTask.trim()
    if (!trimmed) return

    const task = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now()
    }

    setTasks(prev => [task, ...prev])
    setNewTask('')
    inputRef.current?.focus()
  }

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <header className="text-center mb-4">
            <h1 className="fw-bold">To-Do List</h1>
            <p className="text-muted">Stay organized, get things done</p>
          </header>

          {/* Add Task Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-2">
              <div className="col-12 col-md-9">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                >
                  Add
                </button>
              </div>
            </div>
          </form>

          {/* Task List */}
          {tasks.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              <p className="mb-0">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <ul className="list-group">
              {tasks.map(task => (
                <li
                  key={task.id}
                  className="list-group-item d-flex align-items-center gap-3"
                >
                  <input
                    type="checkbox"
                    className="form-check-input flex-shrink-0"
                    style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span
                    className={`flex-grow-1 ${task.completed ? 'todo-completed' : ''}`}
                  >
                    {task.text}
                  </span>
                  {task.completed && (
                    <span className="badge bg-success">Done</span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Task Count */}
          {tasks.length > 0 && (
            <div className="mt-3 text-center text-muted">
              <small>
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} •{' '}
                {tasks.filter(t => t.completed).length} completed
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App