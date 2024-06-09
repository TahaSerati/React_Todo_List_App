export async function getAllServices() {
     const data = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
     if (data.ok) {
          const result = await data.json();
          return result;
     } else {
          throw new Error('Failed to get services');
     }
}

export async function getAllTasks() {
     const data = await fetch('http://localhost:3000/taskStore');
     if (data.ok) {
          const result = await data.json();
          return result;
     } else {
          throw new Error('Failed to get tasks');
     }
}

export async function updateTask(body, options, id) {
     const data = await fetch(`http://localhost:3000/taskStore/${id}`, {
          method: 'PUT',
          headers: options.headers,
          body
     });
     if (data.ok) {
          const result = await data.json();
          return result;
     } else {
          throw new Error('Failed to update task');
     }
}

export async function addTask(body, options) {
     const data = await fetch('http://localhost:3000/taskStore', {
          method: 'POST',
          headers: options.headers,
          body
     });

     if (data.ok) {
          const response = await data.json();
          return response;
     } else {
          throw new Error('Failed to add task');
     }
}

export async function deleteTask(options, id) {
     const data = await fetch(`http://localhost:3000/taskStore/${id}`, {
          method: 'DELETE',
          headers: options.headers,
     });
     if (data.ok) {
          const response = await data.json();
          return response;
     } else {
          throw new Error('Failed to delete task');
     }
}
