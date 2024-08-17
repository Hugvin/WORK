import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Get the JWT token from cookies (or session)
  const token = req.cookies.token;  // You need to use a cookie parser middleware
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    // Verify the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Load loggedinusers.json
    const filePath = path.resolve(process.cwd(), 'api/storage/loggedinusers.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Check if user is logged in
    const loggedInUser = users.find(u => u.userId === user.id);
    if (loggedInUser) {
      return res.status(200).json({ loggedIn: true, user: loggedInUser });
    } else {
      return res.status(401).json({ loggedIn: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
