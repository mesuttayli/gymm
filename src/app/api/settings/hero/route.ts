import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - fetch hero settings (public)
export async function GET() {
  try {
    const videoUrl = await prisma.siteContent.findUnique({
      where: { key: 'hero_video_url' }
    })

    const showVideo = await prisma.siteContent.findUnique({
      where: { key: 'hero_show_video' }
    })

    return NextResponse.json({
      videoUrl: videoUrl?.value || '',
      showVideo: showVideo?.value === 'true'
    })
  } catch (error) {
    console.error('Error fetching hero settings:', error)
    return NextResponse.json(
      { error: 'Ayarlar yuklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - update hero settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { videoUrl, showVideo } = body

    // Validate videoUrl if provided
    if (videoUrl && typeof videoUrl !== 'string') {
      return NextResponse.json(
        { error: 'Gecersiz video URL' },
        { status: 400 }
      )
    }

    // Update or create video URL setting
    await prisma.siteContent.upsert({
      where: { key: 'hero_video_url' },
      update: { value: videoUrl || '' },
      create: { key: 'hero_video_url', value: videoUrl || '', type: 'text' }
    })

    // Update or create show video setting
    await prisma.siteContent.upsert({
      where: { key: 'hero_show_video' },
      update: { value: showVideo ? 'true' : 'false' },
      create: { key: 'hero_show_video', value: showVideo ? 'true' : 'false', type: 'text' }
    })

    return NextResponse.json({
      success: true,
      videoUrl: videoUrl || '',
      showVideo: !!showVideo
    })
  } catch (error) {
    console.error('Error updating hero settings:', error)
    return NextResponse.json(
      { error: 'Ayarlar kaydedilemedi' },
      { status: 500 }
    )
  }
}
