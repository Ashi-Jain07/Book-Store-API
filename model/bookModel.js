import fs from 'fs/promises';
const path = './data/books.json';

export async function getBooks() {
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

export async function saveBooks(books) {
  await fs.writeFile(path, JSON.stringify(books, null, 2));
}
