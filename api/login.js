import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { userId, email, username } = req.body;

  if (!userId || !email || !username) {
    return res.status(400).json({ message: "Missing user info" });
  }

  // Create a JWT token
  const token = jwt.sign({ id: userId, email, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Store the token in a cookie (httpOnly to prevent frontend access)
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);

  // Save the user to loggedinusers.json
  const filePath = path.resolve(process.cwd(), 'api/storage/loggedinusers.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Add the user if they don't already exist
  if (!users.find(user => user.userId === userId)) {
    users.push({ userId, email, username });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }

  return res.status(200).json({ message: "User logged in successfully" });
}
