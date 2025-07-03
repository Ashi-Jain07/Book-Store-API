import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers, saveUsers } from '../model/userModel.js';
import { v4 as uuid } from 'uuid';


//API for user registration
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "Enter email and pasword" })
    }
    console.log(email, password);
    const users = await getUsers();
    console.log(users);


    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: uuid(), email, password: hashed };
    users.push(newUser);
    await saveUsers(users);
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}


//API for user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter email and pasword" })
    }

    const users = await getUsers();

    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    return res.staus(500).json({ message: "Internal server error", error })
  }
}