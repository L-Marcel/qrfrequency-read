import axios from 'axios';

//Endereço do banco de dados
export default axios.create({
  baseURL: `http://192.168.0.107:9000/`
});
