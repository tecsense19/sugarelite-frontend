import AOS from 'aos';

export const client_routes = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  profile: "/profile",
  edit_profile: "/profile/edit",
  profile_id: "profile/:id",
  discover: "/discover",
  chat: "/chat"
}

const server_domain = "https://admin-sugarelite.tec-sense.co.in";
const base_path = server_domain + "/api/V1";

export const server_routes = {
  register: base_path + "/profile/register",
  login: base_path + "/login",
}

export const aosInit = () => {
  AOS.init()
}