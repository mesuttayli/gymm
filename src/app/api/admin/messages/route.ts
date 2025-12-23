import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [messages, registrations] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.registration.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ])
    return NextResponse.json({ messages, registrations })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
