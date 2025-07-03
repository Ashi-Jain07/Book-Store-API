import fs from 'fs/promises';
const path = './data/users.json';

export async function getUsers() {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function saveUsers(users) {
  await fs.writeFile(path, JSON.stringify(users, null, 2));
}