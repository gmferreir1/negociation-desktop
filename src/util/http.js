const axios = require("axios");

const url = window.location.host.split(":")[0];

window.URL_API =
  process.env.NODE_ENV === "development"
    ? `http://${url}:3333`
    : `http://192.168.0.100:3333`;

const client = axios.create({
  baseURL: URL_API
});

export default client;

/*
const axios = require("axios");

//const url = window.location.host.split(":")[0];

const urlDevelopment = "http://localhost:3333";
const urlProduction = "http://10.0.10.95:8002";

window.URL_API = process.env.NODE_ENV === 'development' ? urlDevelopment : urlProduction

const client = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? urlDevelopment : urlProduction
});

export default client;
*/
