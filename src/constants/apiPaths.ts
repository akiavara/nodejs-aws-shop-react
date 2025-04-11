const API_PATHS = {
  product: "https://88fi19k4tg.execute-api.eu-west-3.amazonaws.com/dev",
  order: (import.meta.env.DEV) ? "http://localhost:4000/profile/cart" : "http://akiavara-cart-api-prod.eba-pfajgpsk.eu-west-3.elasticbeanstalk.com/profile/cart",
  import: "https://2z7vq35aj6.execute-api.eu-west-3.amazonaws.com/dev",
  bff: "https://.execute-api.eu-west-3.amazonaws.com/dev",
  cart: (import.meta.env.DEV) ? "http://localhost:4000" : "http://akiavara-cart-api-prod.eba-pfajgpsk.eu-west-3.elasticbeanstalk.com",
  login: (import.meta.env.DEV) ? "http://localhost:4000" : "http://akiavara-cart-api-prod.eba-pfajgpsk.eu-west-3.elasticbeanstalk.com",
};

export default API_PATHS;
