
import axios from "axios";
async function createOrUpdateTask(data) {
  try {
    const response = await axios.post('/api/users/createTask', data);
    console.log("response",response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export  default createOrUpdateTask