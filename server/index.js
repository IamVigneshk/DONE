import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Models
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
});

const Scan = sequelize.define('Scan', {
  targetType: DataTypes.STRING,
  targetValue: DataTypes.STRING,
  status: DataTypes.STRING,
  results: DataTypes.JSON
});

// Relationships
User.hasMany(Scan);
Scan.belongsTo(User);

// Middleware
app.use(cors());
app.use(express.json());

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/scans', authenticateToken, async (req, res) => {
  try {
    const { targetType, targetValue } = req.body;
    const scan = await Scan.create({
      targetType,
      targetValue,
      status: 'pending',
      UserId: req.user.id
    });

    res.status(201).json(scan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scans', authenticateToken, async (req, res) => {
  try {
    const scans = await Scan.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }

  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize database and start server
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Create admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      await User.create({
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        role: 'admin'
      });
      console.log('Admin user created');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
})();