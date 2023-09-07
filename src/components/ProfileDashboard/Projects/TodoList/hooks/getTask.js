import axios from "axios";

async function getTasks(filters = {}) {
  try {
    
    let url = '/api/users/getTasks';


    const queryParams = {};

    if (filters.taskId) {
      queryParams.taskId = filters.taskId;
    }

    if (filters.userId) {
      queryParams.userId = filters.userId;
    }

    if (filters.status) {
      queryParams.status = filters.status;
    }

    const queryParamsString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&');

    if (queryParamsString) {
      url += `?${queryParamsString}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default getTasks;