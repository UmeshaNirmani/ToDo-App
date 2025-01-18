import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
    req.headers["Access-Control-Allow-Origin"] = "*";
    // if (localStorage.getItem("userProfile")) {
    //   req.headers["Authorization"] = `${
    //     "Bearer " + JSON.parse(localStorage.getItem("userProfile")).accessToken
    //   }`;
    // }
    console.log("headers:", req.headers);
    return req;
  });

// user
export const Signup = async (values) => {
  try {
    const response = await API.post('/user/register', values);
    // console.log('test:', response);
    console.log('Registration successful!:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    return error;
  }
};
export const Login = (formData) => API.post("/user/login", formData);

// toDo
export const createRecords = (formData) => API.post("/toDo/create", formData);
export const fetchAllTodos = () => API.post("/toDo/fetchall");
export const fetchOneTodo = (formData) => API.post("/toDo/fetchone", formData);
export const updateRecords = (formData) => API.post("/toDo/update", formData);
export const deleteRecords = (formData) => API.post("/toDo/delete", formData);