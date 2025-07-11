import { NextResponse } from "next/server"
import { client_routes } from "./app/lib/helpers"

export const middleware = (request) => {

    const local_path = "https://sugarelite.tec-sense.co.in"
    // const development = "https://sugarelite-frontend-development.vercel.app"
    const development = "https://sugarelite.tec-sense.co.in"
    // const development = "https://sugarmake.dk"
    // const main = "https://sugarelite.tec-sense.co.in"
    const main = "https://sugarelite.tec-sense.co.in"
    // const main = "https://sugarmake.dk"


    const origin = request.nextUrl.origin

    if (origin === "http://sugarelite.website4you.co.in") {
        return NextResponse.redirect(main)
    }

    const url = origin === local_path ? local_path : (origin === development ? development : main)

    const path = request.nextUrl.pathname
    const user = request.cookies.get("user")?.value


    const public_routes = [client_routes.login, client_routes.register]
    const private_routes = [client_routes.chat, client_routes.discover, client_routes.edit_profile, client_routes.profile, client_routes.profile_id, client_routes.search, client_routes.subscription, client_routes.contactUs, client_routes.verifyIdentity]

    const isPublic = public_routes.some((i) => i === path)
    const isPrivate = private_routes.some((i) => i === client_routes.profile_id ? path.includes("profile/") : i === path)


    if (!user && isPrivate) {
        return NextResponse.redirect(url + client_routes.login)
    }

    if (user && isPublic) {
        return NextResponse.redirect(url + client_routes.search)
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