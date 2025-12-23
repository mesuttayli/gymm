import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './auth'

type Role = 'admin' | 'editor'

interface AuthResult {
  authorized: boolean
  session: Awaited<ReturnType<typeof getServerSession>> | null
  response?: NextResponse
}

export async function requireAuth(allowedRoles: Role[] = ['admin', 'editor']): Promise<AuthResult> {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      authorized: false,
      session: null,
      response: NextResponse.json(
        { error: 'Oturum acmaniz gerekiyor' },
        { status: 401 }
      )
    }
  }

  const userRole = session.user?.role as Role

  if (!allowedRoles.includes(userRole)) {
    return {
      authorized: false,
      session,
      response: NextResponse.json(
        { error: 'Bu islem icin yetkiniz yok' },
        { status: 403 }
      )
    }
  }

  return {
    authorized: true,
    session
  }
}

// Admin-only operations
export async function requireAdmin(): Promise<AuthResult> {
  return requireAuth(['admin'])
}
