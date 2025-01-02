import { pool } from './database';

export async function testConnection() {
    try {
        // Test simple query
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected successfully!');
        console.log('Current timestamp from DB:', result.rows[0].now);

        // Test tables existence
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('\nExisting tables:');
        tables.rows.forEach(table => {
            console.log('-', table.table_name);
        });

    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        // Close the pool
        await pool.end();
    }
}