import axios from 'axios';
import Cookie from 'js-cookie';

axios.defaults.headers.common['Content-Type'] = 'application/json';

//const BASE = "http://localhost:3000"
const BASE = ""

const getConf = token => {
  if (!token) {
    return {baseURL: BASE}
  }
  return {
    baseURL: BASE,
    headers: {
      'Authorization': `Beared ${token}`,
      'Content-Type': 'application/json'
    }
  }
};

const checkStatus = status => !(status >= 200 && status < 300);

const login = email =>
  axios.post('/api/v1/auth', {email}, getConf())
    .then(res => {
      if (checkStatus(res.status)) {
        throw res.status;
      }
      return res.data.token;
    });

const getMe = token =>
  axios.get('/api/v1/me', getConf(token))
    .then(res => {
      if (checkStatus(res.status)) {
        throw res.status;
      }
      return res.data;
    });

const getNextQuestion = token =>
  axios.get('/api/v1/question/next', getConf(token))
    .then(res => {
      if (checkStatus(res.status)) {
        throw res.status;
      }
      return res.data;
    });

const answerQuestion = (token, questionId, value) =>
  axios.patch(`/api/v1/answer/${questionId}`, {value}, getConf(token))
    .then(res => {
      if (checkStatus(res.status)) {
        throw res.status;
      }
      return res.data;
    });

const getRanking = token =>
  axios.get('/api/v1/user', getConf(token))
    .then(res => {
      if (checkStatus(res.status)) {
        throw res.status;
      }
      return res.data;
    });

const formatSeconds = s => {
  s = parseInt(s, 10);
  const h = Math.floor(s / 360);
  s = s - (h * 360);

  const m = Math.floor(s / 60);
  s = s - (m * 60);

  const hs = h < 10 ? `0${h}` : h;
  const ms = m < 10 ? `0${m}` : m;
  const ss = s < 10 ? `0${s}` : s;

  return `${hs}:${ms}:${ss}`;
};

export { login, getMe, getNextQuestion, answerQuestion, getRanking, formatSeconds };