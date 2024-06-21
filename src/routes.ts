import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Submission } from './types';

const router = Router();
const DB_FILE = 'db.json';
const dbFilePath = path.join(__dirname, 'db.json');

// Helper function to read database file
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to database file
const writeDB = (data: any) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Endpoint to check if server is running
router.get('/ping', (req: Request, res: Response) => {
  res.send(true);
});

// Endpoint to submit a new form
router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const db = readDB();
  db.submissions.push({ name, email, phone, github_link, stopwatch_time });
  writeDB(db);
  res.send({ message: 'Submission successful' });
});

// Endpoint to read a specific submission
router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const db = readDB();
  if (index >= 0 && index < db.submissions.length) {
    res.send(db.submissions[index]);
  } else {
    res.status(404).send({ message: 'Submission not found' });
  }
});

router.get('/count', (req: Request, res: Response) => {
  const db = readDB();
  res.send(db.submissions.length.toString());
});

// New endpoint to handle deletion of a submission by index
router.delete('/delete', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const db = readDB();
  if (index >= 0 && index < db.submissions.length) {
      db.submissions.splice(index, 1); // Remove the submission at the given index
      writeDB(db);
      res.sendStatus(200);
  } else {
      res.status(404).send('Submission not found');
  }
});

router.put('/update', (req: Request, res: Response) => {
  const { index, submission } = req.body;
  const db = readDB();
  if (index >= 0 && index < db.submissions.length) {
    db.submissions[index] = submission;
    writeDB(db);
    res.sendStatus(200);
  } else {
    res.status(404).send('Submission not found');
  }
});


router.get('/search', (req: Request, res: Response) => {
  const db = readDB();
  const email = req.query.email as string;
  const submissions = db.submissions.filter((submission: Submission) => submission.email === email);

  if (submissions.length > 0) {
      res.json(submissions);
  } else {
      res.status(404).send('No submissions found with the given email.');
  }
});

export default router;
