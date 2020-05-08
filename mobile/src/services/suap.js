import axios from 'axios';

//Endereço do SUAP
export default axios.create({
  baseURL: `https://suap.ifrn.edu.br/api/v2/`
});
