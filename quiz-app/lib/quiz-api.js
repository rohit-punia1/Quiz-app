import urlMap from "../lib/url-map";
import jwt from 'jwt-decode'

export const login = async (email, password) => {
  let url = urlMap("login");
  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  }).then((res) => res.json());
  window.localStorage.setItem("accessToken", result.accessToken);
  const user = jwt(result.accessToken); // decode your token here
  window.localStorage.setItem('user', JSON.stringify(user));
  return result;
};

export const signup = async (email, password, name) => {
  let url = urlMap("signup");
  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
  return result;
};

export const createQuestion = async (values) => {
  let url = urlMap("createQuestion");
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      title: values.title,
      level: values.level,
      options: [values.option1, values.option2, values.option3, values.option4],
      answers: values.answer.split(","),
      type: values.type,
    }),
  });
  return result;
};

export const getAllQuestion = async () => {
  let url = urlMap("getAllQuestion");
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
  }).then((res) => res.json());
  return result;
};

export const createQuiz = async (values) => {
  let url = urlMap("createQuiz")
  const result = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: values.name,
        assigned_user: [values.assigned_user],
        questions: values.questions,
        total_question: values.total_question
      }),
    }
  )
  return result
}

export const getAllUser = async () => {
  let url = urlMap("getAllUser")
  const result = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }
  ).then(res => res.json())
  return result
}

export const getAllQuiz = async () => {
  let url = urlMap("getAllQuiz")
  const result = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }
  ).then(res => res.json())
  return result
}

export const getQuizById = async (key, id) => {
  let url = urlMap("getQuizById")
  url = url.replace("{id}", id)

  const result = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }
  ).then(res => res.json())

  return result
}

export const createScore = async (total_score, score, quizId) => {
  let url = urlMap("createScore")
  const result = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        total_score: total_score, score: score, quizId: quizId,
      }),
    }
  )
  return result
}


export const getQuizScoreById = async (key, id) => {
  let url = urlMap("getQuizScoreById")
  url = url.replace("{id}", id)

  const result = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    }
  ).then(res => res.json())
  return result
}