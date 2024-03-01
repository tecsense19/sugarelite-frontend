import { NextResponse } from "next/server"
import { client_routes } from "./app/lib/helpers"

export const middleware = (request) => {

    const url = request.nextUrl.origin === "http://localhost:3000" ? "http://localhost:3000" : "https://sugarelite.tec-sense.co.in"

    const path = request.nextUrl.pathname
    const user = request.cookies.get("user")?.value

    // const public_routes = [client_routes.disclaimer, client_routes.termsOfUse, client_routes.privacyPolicy, client_routes.home]

    const public_routes = [client_routes.login, client_routes.register]
    const private_routes = [client_routes.chat, client_routes.discover, client_routes.edit_profile, client_routes.profile, client_routes.profile_id, client_routes.search]

    const isPublic = public_routes.some((i) => i === path)
    const isPrivate = private_routes.some((i) => i === path)


    if (!user && isPrivate) {
        return NextResponse.redirect(url + client_routes.login)
    }

    if (user && isPublic) {
        return NextResponse.redirect(url + client_routes.profile)
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}