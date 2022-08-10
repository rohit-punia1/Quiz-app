/* eslint-disable no-template-curly-in-string */
//console.log("in api map", process.env.REACT_APP_IP);

const server = "http://localhost:4000";
var APIMapping = {
  login: `${server}/api/v1/user/login`,
  signup: `${server}/api/v1/user/signup`,
  createQuestion: `${server}/api/v1/question/_add`,
  getAllQuestion: `${server}/api/v1/question`,
  createQuiz: `${server}/api/v1/quiz/_add`,
  getAllUser: `${server}/api/v1/user`,
  getAllQuiz: `${server}/api/v1/quiz`,
  getQuizById: `${server}/api/v1/quiz/{id}`,
  createScore: `${server}/api/v1/score/_add`,
  getQuizScoreById: `${server}/api/v1/score/{id}`
};
function getAPIMap(name) {
  return APIMapping[name];
}

export default getAPIMap;
