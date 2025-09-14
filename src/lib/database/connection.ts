import mysql from 'mysql2/promise';

// Database configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  acquireTimeout: number;
  timeout: number;
}

// Database connection pool
let pool: mysql.Pool | null = null;

// Create database connection pool
export const createDatabasePool = (): mysql.Pool => {
  if (!pool) {
    const config: DatabaseConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'regnum_pecunia_db',
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
    };

    pool = mysql.createPool(config);
    
    // Handle connection errors
     // Basic error handling without complex event listeners
    // In production, you would add proper error handling
  }
  
  return pool;
};

// Get database connection
export const getDatabase = async (): Promise<mysql.PoolConnection> => {
  const dbPool = createDatabasePool();
  return await dbPool.getConnection();
};

// Execute query with connection management
export const executeQuery = async <T = any>(
  query: string, 
  params: any[] = []
): Promise<T[]> => {
  const connection = await getDatabase();
  
  try {
    const [rows] = await connection.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Execute transaction
export const executeTransaction = async (
  queries: { query: string; params: any[] }[]
): Promise<any[]> => {
  const connection = await getDatabase();
  
  try {
    await connection.beginTransaction();
    
    const results = [];
    for (const { query, params } of queries) {
      const [result] = await connection.execute(query, params);
      results.push(result);
    }
    
    await connection.commit();
    return results;
  } catch (error) {
    await connection.rollback();
    console.error('Transaction error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Initialize database tables
export const initializeDatabase = async (): Promise<void> => {
  try {
    const connection = await getDatabase();
    
    // Check if tables exist
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'Users'
    `, [process.env.DB_NAME || 'regnum_pecunia_db']);
    
    if (Array.isArray(tables) && tables.length === 0) {
      console.log('Tables do not exist. Please run the schema.sql file to create tables.');
    } else {
      console.log('Database tables already exist.');
    }
    
    connection.release();
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await getDatabase();
    await connection.ping();
    connection.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};