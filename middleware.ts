import { NextRequest, NextResponse } from 'next/server'

const locales = ['de', 'en']
const defaultLocale = 'de'
const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl

  // Skip special files and routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const hasLocale = locales.some((locale) => 
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!hasLocale) {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // matcher: ['/((?!api|_next|studio|favicon.ico|.*\\..*).*)'],
  matcher: ["/((?!api|studio|_next/static|_next/image|assets|favicon|favicon.ico|sw.js|manifest.json|logo.svg).*)",],
}
