import axios from "axios";

export const getTasks = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`
  );
  return res.data;
};

export const addTask = async (title: string) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    title,
  });
  return res.data;
};

export const editTask = async (
  id: string,
  title: string,
  completed: boolean
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
    { title, completed }
  );
  return res.data;
};
