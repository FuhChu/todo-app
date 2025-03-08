from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory todo list (replace with database in production)
todos = []
next_id = 1

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    global next_id
    task = request.get_json()['task']
    new_todo = {'id': next_id, 'task': task}
    todos.append(new_todo)
    next_id += 1
    return jsonify(new_todo), 201

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) #Use PORT environment variable
    app.run(debug=True, host='0.0.0.0', port=port)