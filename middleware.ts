
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';
import { parse } from 'cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value || null;
	const refreshToken = cookieStore.get('refreshToken')?.value || null;
	const { pathname } = request.nextUrl;

	const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
	const isPublic = publicRoutes.some(route => pathname.startsWith(route));

	if (isPrivate && !accessToken && !refreshToken) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	if (accessToken) {
		const sessionValid = await checkSession();
		if (!sessionValid && refreshToken) {
			const refreshed = await tryRefreshSession(refreshToken, cookieStore);
			if (refreshed) return refreshed;
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}
		if (isPublic && sessionValid) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		return NextResponse.next();
	}

	if (refreshToken) {
		const refreshed = await tryRefreshSession(refreshToken, cookieStore);
		if (refreshed) {
			if (isPublic) {
				return NextResponse.redirect(new URL('/', request.url));
			}
			return refreshed;
		}
	}

	if (isPublic && accessToken) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

async function tryRefreshSession(refreshToken: string, cookieStore: ReadonlyRequestCookies) {
	try {
		const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});
		if (!apiRes.ok) return null;

		const setCookieHeader = apiRes.headers.get('set-cookie');
		if (!setCookieHeader) return null;

		const cookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
		const response = NextResponse.next();

		for (const cookieStr of cookieArray) {
			const parsed = parse(cookieStr);

			if (parsed.accessToken) {
				cookieStore.set('accessToken', parsed.accessToken, {
					httpOnly: true,
					path: parsed.Path ?? '/',
					expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
					maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
				});
			}
			if (parsed.refreshToken) {
				cookieStore.set('refreshToken', parsed.refreshToken, {
					httpOnly: true,
					path: parsed.Path ?? '/',
					expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
					maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
				});
			}
		}
		return response;
	} catch {
		return null;
	}
}

export const config = {
	matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};




// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { checkServerSession } from './lib/api/serverApi';
// import { parse } from 'cookie';

// const privateRoutes = ['/profile', '/notes'];
// const publicRoutes = ['/sign-in', '/sign-up'];

// export async function middleware(request: NextRequest) {
// 	const cookieStore = await cookies();
// 	const accessToken = cookieStore.get('accessToken')?.value;
// 	const refreshToken = cookieStore.get('refreshToken')?.value;
// 	const { pathname } = request.nextUrl;
// 	const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
// 	const isPublic = publicRoutes.some(route => pathname.startsWith(route));

// 	if (isPrivate) {
// 		if (!accessToken) {
// 			if (refreshToken) {
// 				const apiRes = await checkServerSession();
// 				const setCookie = apiRes.headers['set-cookie'];

// 				if (setCookie) {
// 					const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

// 					for (const cookieStr of cookieArray) {
// 						const parsed = parse(cookieStr);
// 						const options = {
// 							expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
// 							path: parsed.Path,
// 							maxAge: Number(parsed['Max-Age']),
// 						};
// 						if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
// 						if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
// 					}
// 					return NextResponse.next({
// 						headers: {
// 							Cookie: cookieStore.toString(),
// 						},
// 					});
// 				}
// 			}
// 			return NextResponse.redirect(new URL('/sign-in', request.url));
// 		}
// 	}

// 	if (isPublic) {
// 		if (!accessToken) {
// 			if (refreshToken) {
// 				const apiRes = await checkServerSession();
// 				const setCookie = apiRes.headers['set-cookie'];

// 				if (setCookie) {
// 					const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
// 					for (const cookieStr of cookieArray) {
// 						const parsed = parse(cookieStr);
// 						const options = {
// 							expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
// 							path: parsed.Path,
// 							maxAge: Number(parsed['Max-Age']),
// 						};
// 						if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
// 						if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
// 					}
// 					return NextResponse.redirect(new URL('/profile', request.url), {
// 						headers: {
// 							Cookie: cookieStore.toString(),
// 						},
// 					});
// 				}
// 			}
// 			return NextResponse.next();
// 		}
// 		return NextResponse.redirect(new URL('/profile', request.url));
// 	}

// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
// };