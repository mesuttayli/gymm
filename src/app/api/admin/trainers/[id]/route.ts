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

    const trainer = await prisma.trainer.update({
      where: { id },
      data: {
        name: body.name,
        specialty: body.specialty,
        description: body.description,
        image: body.image || null,
        instagram: body.instagram || null,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      }
    })
    return NextResponse.json(trainer)
  } catch (error) {
    console.error('Error updating trainer:', error)
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
    await prisma.trainer.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting trainer:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
