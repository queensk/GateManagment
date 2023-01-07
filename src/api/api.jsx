import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.88.13:8080/api",
});
