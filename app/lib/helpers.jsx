
export const client_routes = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  profile: "/profile",
  edit_profile: "/profile/edit",
  profile_id: "profile/:id",
  discover: "/discover",
  chat: "/chat",
  disclaimer: "/disclaimer",
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
  subscription: "/subscription"
}

const server_domain = "https://admin-sugarelite.tec-sense.co.in";
const base_path = server_domain + "/api/V1";

export const socket_server = "https://socket-server-evpc.onrender.com"

export const server_routes = {
  register: base_path + "/profile/register",
  login: base_path + "/login",
  newsLetter: base_path + "/newsletter",
  checkUser: base_path + "/checkUser",
  forgotPassword: base_path + "/forgot/password",
  allProfiles: base_path + "/profile/list",
  chatList: base_path + "/chat/list",
  sendMessage: base_path + "/chat/send",
  friends_list: base_path + "/profile/friends",
  friends_request: base_path + "/friends",
  private_image_access: base_path + "/privateimages/access",
  stripe_subscription: base_path + "/create/subscription"
}


export const client_notification = (api, placement, type, msg, duration) => {
  api[type]({
    message: msg,
    placement,
    duration: duration,
    bottom: 0
  });
}