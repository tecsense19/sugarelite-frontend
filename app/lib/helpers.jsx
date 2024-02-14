import AOS from 'aos';

export const client_routes = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  profile: "/profile"
}

export const aosInit = () => {
  AOS.init()
}