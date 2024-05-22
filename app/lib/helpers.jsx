
export const client_routes = {
  home: "/",
  login: "/login",
  register: "/register",
  search: "/search",
  profile: "/profile",
  edit_profile: "/profile/edit",
  profile_id: "profile/:id",
  discover: "/discover",
  chat: "/message",
  message: "/message",
  disclaimer: "/disclaimer",
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
  subscription: "/subscription",
  contactUs: "/contact-us",
  verifyIdentity: "/verify-identity",
}

const server_domain = "https://admin-sugarelite.tec-sense.co.in";
const base_path = server_domain + "/api/V1";

export const socket_server = "https://sugarelite-socket-server.onrender.com"
// export const socket_server = "http://localhost:8080"

export const server_routes = {
  register: base_path + "/profile/register",
  login: base_path + "/login",
  logout: base_path + "/logout",
  newsLetter: base_path + "/newsletter",
  checkUser: base_path + "/checkUser",
  forgotPassword: base_path + "/forgot/password",
  allProfiles: base_path + "/profile/list",
  chatList: base_path + "/chat/list",
  sendMessage: base_path + "/chat/send",
  readMessage: base_path + "/readmessage",
  friends: base_path + "/friendsnew",
  friends_request: base_path + "/friends",
  private_album_notification: base_path + "/push/privatealbum",
  friends_request_notification: base_path + "/push/friendrequest",
  private_image_request: base_path + "/privateimages/access",
  private_image_access: base_path + "/privateimages/access/decline",
  stripe_subscription: base_path + "/create/subscription",
  cancel_subscription: base_path + "/cancel/subscription",
  start_stop_subscription: base_path + "/start/stop/subscription",
  send_otp: base_path + "/otp",
  verify_otp: base_path + "/verifyotp",
  block_user: base_path + "/block/user",
  report_user: base_path + "/report/user",
  contactUs: base_path + "/contactus",
  verifyIdentity: base_path + "/verifyidentity",
  getSupportMsg: base_path + "/getelitesupport",
  sendSupportMsg: base_path + "/elitesupport",
  getBroadcastMsg: base_path + "/get_broadcast",
  getLaguageMaster: base_path + "/get_laguage_master"
}


export const client_notification = (api, placement, type, msg, duration) => {
  api[type]({
    message: msg,
    placement,
    duration: duration,
    bottom: 0
  });
}