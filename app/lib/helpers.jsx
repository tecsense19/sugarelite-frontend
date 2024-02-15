import AOS from 'aos';

export const client_routes = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  profile: "/profile",
  edit_profile: "/profile/edit",
  discover: "/discover"
}

export const aosInit = () => {
  AOS.init()
}