import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  console.log(response.cookies.get('token')?.value)
  response.cookies.set('token', '73a8b9e5-cb4f-4093-ac7e-29b7757356f8')
  cookie = response.cookies.get('token')?.value
 
  response.headers.set('user-token', 'abc');
  
  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}