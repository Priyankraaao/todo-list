import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Todo from "@/models/todoModels"; 

connect();

export async function GET(request) {
  try {
    // const { id='', userId='', status='' } = request.query;

    // const filter = {};

    // if (id) {
    //   filter.id = id;
    // }

    // if (userId) {
    //   filter.userId = userId;
    // }

    
    // if (status) {
    //   filter.status = status;
    // }

   
    // if (Object.keys(filter).length === 0) {
      const tasks = await Todo.find();
      return NextResponse.json({ tasks });
    // }

   
    // const tasks = await Todo.find(filter);

    // return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
