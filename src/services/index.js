// url: https://api.themoviedb.org/3/movie/550?api_key=14868672c6657c73a5236b83372a2e77
// base da url: https://api.themoviedb.org/3/

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
