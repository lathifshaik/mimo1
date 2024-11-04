import db from './db';

export interface User {
  id: number;
  name: string;
  email: string;
}

// Simple hash function for demo purposes
function hashPassword(password: string): string {
  return btoa(password); // In production, use a proper crypto library
}

export function registerUser(name: string, email: string, password: string): User {
  const hashedPassword = hashPassword(password);
  
  try {
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(name, email, hashedPassword);
    
    return {
      id: result.lastInsertRowid as number,
      name,
      email,
    };
  } catch (error) {
    if ((error as any).code === 'SQLITE_CONSTRAINT') {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

export function loginUser(email: string, password: string): { user: User; token: string } {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email) as any;

  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = hashPassword(password);
  if (hashedPassword !== user.password) {
    throw new Error('Invalid password');
  }

  // Create a simple token
  const token = btoa(`${user.id}:${user.email}:${Date.now()}`);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export function verifyToken(token: string): User {
  try {
    const [id] = atob(token).split(':');
    const stmt = db.prepare('SELECT id, name, email FROM users WHERE id = ?');
    const user = stmt.get(Number(id));
    
    if (!user) {
      throw new Error('User not found');
    }

    return user as User;
  } catch (error) {
    throw new Error('Invalid token');
  }
}