import express from 'express';
import Contact from '../models/contact.js'; // Ensure the correct path

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      membership: req.body.membership,
      message: req.body.message
    });

    const savedContact = await newContact.save();

    // Respond with a success message
    res.status(201).json({ message: 'Form submitted successfully!', data: savedContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

export default router;

