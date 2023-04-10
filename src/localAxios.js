import axios from 'axios';

// crear una instancia personalizada de axios
const localAxios = axios.create({
  baseURL: 'http://localhost:8000',
  // habilitar el uso de cookies
  withCredentials: true,  
});

// interceptar todas las solicitudes para agregar el token XSRF-TOKEN
localAxios.interceptors.request.use(config => {
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken) {
     // agrego el token como un encabezado personalizado
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  }
  return config;
});

// función para obtener el valor de una cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.pop().split(';').shift();
}

export default localAxios;