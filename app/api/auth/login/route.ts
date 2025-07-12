import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const apiRegister = await api.post('/auth/login', body);
  const cookiesStore = await cookies();
  const setCookie = apiRegister.headers['set-cookie'];

  if (setCookie) {
    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookieStr of cookieArray) {
      const parsed = parse(cookieStr);
      const options = {
        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        path: parsed.Path,
        maxAge: Number(parsed['Max-Age']),
        httpOnly: true,
        secure: true,
      };
      if (parsed.accessToken) {
        cookiesStore.set('accessToken', parsed.accessToken, options);
      }
      if (parsed.refreshToken) {
        cookiesStore.set('refreshToken', parsed.refreshToken, options);
      }
    }
    return NextResponse.json(apiRegister.data);
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
