import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // let cookie

  const cookieStore = cookies()
  console.log(cookieStore.get('token'))
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  // console.log(response.cookies.get('token'))
  response.cookies.set('token', '83834e41-d99e-4ae2-bbac-6f7e7e8e8d98')
  // cookie = response.cookies.get('token')?.value
  
  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}