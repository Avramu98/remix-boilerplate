import axios from 'axios';

const config = {
  headers: {
    Authorization: 'Bearer wn9MAxx_Hfxo1UswlL7r9hPUzeswvOU-_6DFSE28wSI',
  },
};
const apiUrl = 'https://www.meistertask.com/api';

export const getProjects = async () => {
  try {
    const res = await axios.get(`${apiUrl}/projects`, config);
    const { data } = res;
    const projectId = data.map((projects) => projects.id);
    return projectId;
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = async (projectId: string) => {
  try {
    const res = await axios.get(`${apiUrl}/projects/${projectId}/tasks`, config);
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err);
  }
};
