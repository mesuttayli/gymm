'use client'

import { useState, useEffect } from 'react'
import { Video, Save, Eye, EyeOff, Play, AlertCircle, CheckCircle } from 'lucide-react'

export default function HeroAdmin() {
  const [videoUrl, setVideoUrl] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/hero')
      const data = await response.json()
      if (data && !data.error) {
        setVideoUrl(data.videoUrl || '')
        setShowVideo(data.showVideo || false)
      }
    } catch (error) {
      console.error('Error fetching hero settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/settings/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, showVideo })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Ayarlar basariyla kaydedildi!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Bir hata olustu' })
      }
    } catch (error) {
      console.error('Error saving hero settings:', error)
      setMessage({ type: 'error', text: 'Ayarlar kaydedilemedi' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#FF3D00] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Video className="w-7 h-7 text-[#FF3D00]" />
          Hero Video Ayarlari
        </h1>
        <p className="text-[#A0A0A0] mt-1">
          Ana sayfa hero bolumundeki arkaplan videosunu yonetin
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-3 p-4 mb-6 rounded-lg border ${
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-[#151515] border border-[#2A2A2A] rounded-xl p-6 space-y-6">
          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="input"
              placeholder="https://example.com/video.mp4"
            />
            <p className="text-xs text-[#666666] mt-2">
              MP4 formatinda bir video URL&apos;si girin. Video public klasore yuklenmis olmali veya harici bir kaynaktan saglanmalidir.
            </p>
          </div>

          {/* Show Video Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#111111] rounded-lg border border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              {showVideo ? (
                <Eye className="w-5 h-5 text-[#00FF88]" />
              ) : (
                <EyeOff className="w-5 h-5 text-[#A0A0A0]" />
              )}
              <div>
                <p className="text-white font-medium">Video Goster</p>
                <p className="text-xs text-[#666666]">
                  Acik olduğunda hero bolumunde video arkaplan gosterilir
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowVideo(!showVideo)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                showVideo ? 'bg-[#00FF88]' : 'bg-[#2A2A2A]'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                  showVideo ? 'left-8' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Video Preview */}
          {videoUrl && showVideo && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                On Izleme
              </label>
              <div className="relative aspect-video bg-[#111111] rounded-lg overflow-hidden border border-[#2A2A2A]">
                <video
                  key={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Video desteklenmiyor
                </video>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                  <Play className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-xs text-white">Canli On Izleme</span>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary w-full sm:w-auto"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-[#111111] border border-[#2A2A2A] rounded-lg max-w-2xl">
        <h3 className="text-white font-medium mb-2">Onemli Bilgiler</h3>
        <ul className="text-sm text-[#A0A0A0] space-y-1 list-disc list-inside">
          <li>Video MP4 formatinda olmalidir</li>
          <li>Dusuk dosya boyutu icin videolari sikistirin (10-20MB ideal)</li>
          <li>Video otomatik olarak sessiz ve dongude oynatilir</li>
          <li>Video gosterilmediginde gradient arkaplan kullanilir</li>
        </ul>
      </div>
    </div>
  )
}
