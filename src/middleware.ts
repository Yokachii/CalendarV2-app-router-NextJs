import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // let cookie

  const cookieStore = cookies()
  let token = cookieStore.get('token')?.value
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  // response.cookies.set('token', '83834e41-d99e-4ae2-bbac-6f7e7e8e8d98')
  // cookie = response.cookies.get('token')?.value
  
  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    body: JSON.stringify({token}),
  });
  const status = res.status
  
  if(status>=200&&status<300){
    const json = await res.json();

    response.headers.set('user-account', JSON.stringify(json.user));
  }else{
    response.headers.set('user-account', '');
  }

  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}