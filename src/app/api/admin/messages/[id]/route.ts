import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    // Check if it's a contact message or registration
    if (body.type === 'message') {
      const message = await prisma.contactMessage.update({
        where: { id },
        data: { isRead: body.isRead ?? true }
      })
      return NextResponse.json(message)
    } else if (body.type === 'registration') {
      const registration = await prisma.registration.update({
        where: { id },
        data: { status: body.status }
      })
      return NextResponse.json(registration)
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'message') {
      await prisma.contactMessage.delete({ where: { id } })
    } else if (type === 'registration') {
      await prisma.registration.delete({ where: { id } })
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
