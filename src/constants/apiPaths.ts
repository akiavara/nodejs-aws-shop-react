const API_PATHS = {
  product: "https://88fi19k4tg.execute-api.eu-west-3.amazonaws.com/dev",
  order: (import.meta.env.DEV) ? "http://localhost:4000/profile/cart" : "https://45jb31lr7j.execute-api.eu-west-3.amazonaws.com/prod/profile/cart",
  import: "https://2z7vq35aj6.execute-api.eu-west-3.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-3.amazonaws.com/dev",
  cart: (import.meta.env.DEV) ? "http://localhost:4000" : "https://45jb31lr7j.execute-api.eu-west-3.amazonaws.com/prod",
};

export default API_PATHS;
