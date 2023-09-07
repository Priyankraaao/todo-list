
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  id: {
   type: String,
     required: true,
  },
  userId:{
     type: String,
    required: false,
  }
});

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema);
