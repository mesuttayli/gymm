import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, package: packageType, message } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Ad ve e-posta alanlari zorunludur' },
        { status: 400 }
      )
    }

    // Create contact message
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: packageType ? `Paket: ${packageType}` : null,
        message: message || '',
      },
    })

    // If there's a package selection, also create a registration
    if (packageType) {
      await prisma.registration.create({
        data: {
          name,
          email,
          phone: phone || '',
          packageType,
          message: message || null,
        },
      })
    }

    return NextResponse.json(
      { success: true, id: contactMessage.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Mesaj gonderilemedi. Lutfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
