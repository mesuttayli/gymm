import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const trainers = await prisma.trainer.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(trainers)
  } catch (error) {
    console.error('Error fetching trainers:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const trainer = await prisma.trainer.create({
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
    return NextResponse.json(trainer, { status: 201 })
  } catch (error) {
    console.error('Error creating trainer:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
