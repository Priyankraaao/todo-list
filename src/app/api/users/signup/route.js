import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Todo from "@/models/todoModels"; 

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { taskId, title, description, status, userId } = reqBody;

    
    const existingTask = await Todo.findOne({ taskId });

    if (existingTask) {
   
      const updatedTask = await Todo.findOneAndUpdate(
        { taskId },
        { title, description, status, userId },
        { new: true }
      );

      return NextResponse.json({
        message: "Task updated successfully",
        task: updatedTask,
      });
    } else {
     
      const newTask = new Todo({
        taskId,
        title,
        description,
        status,
        userId,
      });

      const savedTask = await newTask.save();

      if (!savedTask) {
        return NextResponse.json(
          { error: "Task could not be saved" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Task created successfully",
        task: savedTask,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
