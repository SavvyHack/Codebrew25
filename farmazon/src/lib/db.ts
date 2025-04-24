import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',     // or your Docker container name
  user: 'root',
  password: 'Ttyyuu11..', //this password change accordingly to ur pasword setup when u install mysql
  database: 'farmazon',
  port: 3307, // add this as I map on 3307
});

(async () => {
    try {
      const connection = await db.getConnection();
      console.log('✅ MySQL connected successfully');
      connection.release();
    } catch (error) {
      console.error('❌ MySQL connection failed:', error);
    }
  })();