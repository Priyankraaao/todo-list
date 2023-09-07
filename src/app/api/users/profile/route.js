import dbConnect from '@/helpers/dbConnect';
import Todo from "@/models/todoModels";



export default async function handler(req, res) {
  
  await dbConnect();

  if (req.method === 'GET') {
    try {
      
        const todos = await Todo.find({})

      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } 

  if (req.method === 'POST') {
    try {
      const { id, title, description, status, userId } = req.body;

     
      if (id) {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });

        if (!updatedTodo) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: updatedTodo });
      } else {
       
        const newTodo = new Todo({
          id,
          title,
          description,
          status,
          userId,
        });

        const savedTodo = await newTodo.save();

        res.status(200).json({ success: true, data: savedTodo });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
