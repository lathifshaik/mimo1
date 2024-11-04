import db from './db';
import { User } from './auth';

// Workout functions
export function logWorkout(userId: number, type: string, duration: number, calories: number) {
  const stmt = db.prepare(
    'INSERT INTO workouts (user_id, type, duration, calories) VALUES (?, ?, ?, ?)'
  );
  return stmt.run(userId, type, duration, calories);
}

export function getWorkouts(userId: number) {
  const stmt = db.prepare('SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC');
  return stmt.all(userId);
}

// Nutrition functions
export function logMeal(
  userId: number,
  mealType: string,
  foodName: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number
) {
  const stmt = db.prepare(
    'INSERT INTO nutrition_logs (user_id, meal_type, food_name, calories, protein, carbs, fat) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  return stmt.run(userId, mealType, foodName, calories, protein, carbs, fat);
}

export function getNutritionLogs(userId: number) {
  const stmt = db.prepare('SELECT * FROM nutrition_logs WHERE user_id = ? ORDER BY date DESC');
  return stmt.all(userId);
}

// Community functions
export function createPost(userId: number, content: string) {
  const stmt = db.prepare('INSERT INTO community_posts (user_id, content) VALUES (?, ?)');
  return stmt.run(userId, content);
}

export function getPosts() {
  const stmt = db.prepare(`
    SELECT 
      p.*,
      u.name as author_name
    FROM community_posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);
  return stmt.all();
}

export function likePost(postId: number) {
  const stmt = db.prepare('UPDATE community_posts SET likes = likes + 1 WHERE id = ?');
  return stmt.run(postId);
}

// User stats
export function getUserStats(userId: number) {
  const workoutStats = db.prepare(`
    SELECT 
      COUNT(*) as total_workouts,
      SUM(duration) as total_duration,
      SUM(calories) as total_calories
    FROM workouts 
    WHERE user_id = ?
  `).get(userId);

  const nutritionStats = db.prepare(`
    SELECT 
      SUM(calories) as total_calories,
      SUM(protein) as total_protein,
      SUM(carbs) as total_carbs,
      SUM(fat) as total_fat
    FROM nutrition_logs 
    WHERE user_id = ? 
    AND date >= datetime('now', '-7 days')
  `).get(userId);

  return {
    workoutStats,
    nutritionStats,
  };
}