const loginService = async (credentials) => {
  return fetch("http://localhost:4000/app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};
const registerService = async (credentials) => {
  return fetch("http://localhost:4000/app/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const services = {
  registerService,
  loginService,
};
