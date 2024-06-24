import cron from 'node-cron';
import exportToExcel from './exportToExcel.js';

// Schedule the task to run every 3 hours
cron.schedule('0 */3 * * *', async () => {
  console.log('Running cron job to export data to Excel...');
  await exportToExcel();
});
