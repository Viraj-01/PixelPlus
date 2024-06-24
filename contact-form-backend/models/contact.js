import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  membership: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Contact = models.Contact || model('Contact', contactSchema);

export default Contact;
