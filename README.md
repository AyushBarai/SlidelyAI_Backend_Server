# Form

## Overview
Form is a Node.js backend application that provides APIs for submitting, reading, updating, deleting, and searching form submissions. It uses a JSON file as the database to store submission data.

## Features
- Submit a new form.
- Read a specific submission by index.
- Update a specific submission by index.
- Delete a specific submission by index.
- Search submissions by email.
- Get the total count of submissions.
- Health check endpoint.

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

##Setup

1. Clone the Repository:
```bash
git clone https://github.com/AyushBarai/SlidelyAI_Backend_Server.git
cd SlidelyAI_Backend_Server
```

2. Install Dependencies:
```bash
npm install
```

3. Create a Database File:

Create a db.json file in the root directory with the following content:
```json
{
  "submissions": []
}
```

4. Start the Server:
```bash
npm start
The server will run on http://localhost:3000.
```

## API Endpoints

### Health Check - http://localhost:3000/ping

- GET /ping
Check if the server is running.

Response:
```json
true
```

### Submit a Form - http://localhost:3000/submit
 
- POST /submit
Submit a new form entry.

Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "phone": "9876543210",
  "githubLink": "https://github.com/john_doe/my_slidely_task",
  "stopwatchTime": "00:01:19"
}
```
Response:
```json
{
  "message": "Submission successful"
}
```

### Read a Submission -http://localhost:3000/read?index=1
  
- GET /read
Read a specific submission by index.

Query Parameters:
index: The index of the submission to read.

Response:
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "phone": "9876543210",
  "githubLink": "https://github.com/john_doe/my_slidely_task",
  "stopwatchTime": "00:01:19"
}
```

### Update a Submission - http://localhost:3000/update
  
- PUT /update
Update a specific submission by index.

Request Body:
```json
{
  "index": 0,
  "submission": {
    "name": "John Doe Updated",
    "email": "johndoe_updated@gmail.com",
    "phone": "9876543210",
    "githubLink": "https://github.com/john_doe/my_slidely_task",
    "stopwatchTime": "00:01:20"
  }
}
```
Response:

```json
200 OK
```

### Delete a Submission - http://localhost:3000/count
  
- DELETE /delete
Delete a specific submission by index.

Query Parameters:
index: The index of the submission to delete.

Response:
```json
200 OK
```

### Search Submissions - http://localhost:3000/search?email=ayushbcse2024@Gmail.com
  
- GET /search
Search submissions by email.

Query Parameters:
email: The email to search for.

Response:
```json
[
  {
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "9876543210",
    "githubLink": "https://github.com/john_doe/my_slidely_task",
    "stopwatchTime": "00:01:19"
  }
]
```

### Get Submission Count - http://localhost:3000/count

- GET /count
Get the total count of submissions.

Response:
```json
"1"
```

## Code Structure

### Main Files
- src/routes.ts: Defines all the API endpoints and their logic.
- src/types.ts: Contains TypeScript type definitions.

### Helper Functions
- readDB: Reads the database file (db.json).
- writeDB: Writes to the database file (db.json).

### Running Tests
To test the API endpoints, you can use tools like Postman or cURL. Make sure the server is running (npm start) before sending requests.
