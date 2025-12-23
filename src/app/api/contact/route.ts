import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { contactFormSchema } from '@/lib/validations'
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit'

// Sanitize input to prevent XSS
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    const rateLimitResult = rateLimit(`contact:${ip}`, RATE_LIMITS.contact)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Cok fazla istek gonderdiniz. Lutfen biraz bekleyin.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    const body = await request.json()

    // Validate input with Zod
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(e => e.message).join(', ')
      return NextResponse.json(
        { error: errors },
        { status: 400 }
      )
    }

    const { name, email, phone, package: packageType, message } = validationResult.data

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : null,
      subject: packageType ? `Paket: ${sanitize(packageType)}` : null,
      message: message ? sanitize(message) : '',
    }

    // Create contact message
    const contactMessage = await prisma.contactMessage.create({
      data: sanitizedData,
    })

    // If there's a package selection, also create a registration
    if (packageType) {
      await prisma.registration.create({
        data: {
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone || '',
          packageType: sanitize(packageType),
          message: sanitizedData.message || null,
        },
      })
    }

    return NextResponse.json(
      { success: true, id: contactMessage.id },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        }
      }
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
