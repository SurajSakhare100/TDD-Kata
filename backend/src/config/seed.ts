import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { seedUsers, seedSweets } from './seedData';

dotenv.config();

// Create a separate pool for seeding
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'sweet_shop_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
      }
);

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await client.query('DELETE FROM sweets');
    await client.query('DELETE FROM users WHERE email LIKE $1', ['%@sweetshop.com']);
    await client.query('DELETE FROM users WHERE email LIKE $1', ['%@example.com']);

    // Seed users
    console.log('👥 Seeding users...');
    for (const user of seedUsers) {
      const passwordHash = await bcrypt.hash(user.password, 10);
      await client.query(
        'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET password_hash = $2, role = $3',
        [user.email, passwordHash, user.role]
      );
      console.log(`   ✓ Created ${user.role}: ${user.email} (password: ${user.password})`);
    }

    // Seed sweets
    console.log('🍬 Seeding sweets...');
    for (const sweet of seedSweets) {
      await client.query(
        'INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO UPDATE SET category = $2, price = $3, quantity = $4',
        [sweet.name, sweet.category, sweet.price, sweet.quantity]
      );
      console.log(`   ✓ Created: ${sweet.name} (${sweet.category}) - $${sweet.price} - Qty: ${sweet.quantity}`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@sweetshop.com / admin123');
    console.log('   User:  user@sweetshop.com / user123');
    console.log('   User:  john@example.com / password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seed if executed directly
seedDatabase()
  .then(() => {
    console.log('✨ Seed script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });

export default seedDatabase;

