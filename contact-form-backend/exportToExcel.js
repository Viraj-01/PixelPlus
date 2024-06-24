import mongoose from 'mongoose';
import Contact from './models/contact.js'; // Ensure correct path and file extension
import ExcelJS from 'exceljs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function exportToExcel() {
  try {
    const contacts = await Contact.find(); // Use the Contact model's find method

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Created At', key: 'createdAt', width: 30 },
    ];

    contacts.forEach(contact => {
      worksheet.addRow(contact.toObject()); // Convert Mongoose document to plain object
    });

    const exportPath = join(__dirname, 'exports', `contacts_${new Date().toISOString().split('T')[0]}.xlsx`);
    await workbook.xlsx.writeFile(exportPath);

    console.log('Excel file exported:', exportPath);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
}

export default exportToExcel;
