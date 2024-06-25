import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors'; 
import contactRoutes from './routes/contact.js';  // Use ES module import
import cron from 'node-cron';
import exportToExcel from './exportToExcel.js';


dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const exportDir = path.join(path.resolve(), 'exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

app.use(cors()); // Add this line
app.use('/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Schedule the task to run every 3 hours
cron.schedule('0 */3 * * *', async () => {
  console.log('Running cron job to export data to Excel...');
  await exportToExcel();
});