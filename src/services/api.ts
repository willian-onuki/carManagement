import axios from 'axios';


export const apiService = axios.create({
  baseURL: 'http://api-test.bhut.com.br:3000/api',
})
