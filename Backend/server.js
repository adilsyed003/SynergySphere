const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const employeerouter = require("./routes/employee.route");
const authRouter = require('./routes/auth.route');
const dashboardRouter = require('./routes/dashboard.route');
const projectRouter = require('./routes/project.route');
const taskRouter = require('./routes/task.route');
const app = express();

dotenv.config({ path: "./config.env" });

app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(morgan('dev'))

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log("DB Disconnected");
  });

const { authMiddleware } = require('./middleware/auth.middleware');

app.use('/api/auth', authRouter);

app.use('/api/employees', authMiddleware, employeerouter);
app.use('/api/dashboard', authMiddleware, dashboardRouter);
app.use('/api/projects', authMiddleware, projectRouter);
app.use('/api/tasks', authMiddleware, taskRouter);

const port = process.env.PORT || 11000;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 11000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
}

module.exports = app;

