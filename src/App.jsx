import { useState, useEffect, useRef } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)

  // Load tasks from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('helloWorldEntries')
    if (saved) {
      try {
        setTasks(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved entries:', e)
      }
    }
  }, [])

  // Save tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('helloWorldEntries', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = newTask.trim()
    if (!trimmed) return

    const task = {
      id: crypto.randomUUID(),
      text: 'Hello World.',
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
            <h1 className="fw-bold">Hello World List</h1>
            <p className="text-muted">Add entries by typing and pressing Enter</p>
          </header>

          {/* Add Entry Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group input-group-lg">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder='Type "Hello World" and press Enter...'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e)
                  }
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </form>

          {/* Hello World Entries List */}
          {tasks.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              <p className="mb-0">No entries yet. Type and press Enter!</p>
            </div>
          ) : (
            <ul className="list-group">
              {/* Active entries (completed: false) appear first */}
              {tasks.filter(task => !task.completed).map(task => (
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
                    className={'flex-grow-1'}
                  >
                    {task.text}
                  </span>
                </li>
              ))}
              {/* Completed entries (completed: true) appear below */}
              {tasks.filter(task => task.completed).map(task => (
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

          {/* Entry Count */}
          {tasks.length > 0 && (
            <div className="mt-3 text-center text-muted">
              <small>
                {tasks.length} entr{tasks.length !== 1 ? 'ies' : 'y'} •{' '}
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