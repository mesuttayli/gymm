'use client'

import { useState } from 'react'
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', package: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase text-sm">
            Iletisim
          </span>
          <h2 className="section-title mt-2">
            Bizimle
            <span className="gradient-text"> Iletisime Gecin</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Sorulariniz veya uyelik basvurusu icin asagidaki formu doldurun.
            En kisa surede size donelim.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-2xl p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[var(--accent-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[var(--accent-secondary)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tesekkurler!</h3>
                <p className="text-[var(--foreground-muted)]">
                  Mesajiniz basariyla gonderildi. En kisa surede size donecegiz.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary mt-6"
                >
                  Yeni Mesaj Gonder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Adiniz Soyadiniz *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Ornek: Ahmet Yilmaz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="0532 XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Ilgilendiginiz Paket
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Paket Secin</option>
                      <option value="baslangic">Baslangic - 499 TL/ay</option>
                      <option value="premium">Premium - 799 TL/ay</option>
                      <option value="elite">Elite - 1299 TL/ay</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mesajiniz
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="input resize-none"
                    placeholder="Soru veya isteklerinizi yazin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Gonderiliyor...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gonder
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-2xl overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--background-tertiary)] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[var(--accent-primary)] mx-auto mb-2" />
                  <p className="text-[var(--foreground-muted)]">Harita Goruntule</p>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent-primary)] transition-colors">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h4 className="font-semibold text-white mb-1">Adres</h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Ornek Mahallesi, Fitness Caddesi No: 123, Kadikoy, Istanbul
                </p>
              </div>

              <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent-primary)] transition-colors">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h4 className="font-semibold text-white mb-1">Telefon</h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  +90 212 XXX XX XX
                  <br />
                  +90 532 XXX XX XX
                </p>
              </div>

              <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent-primary)] transition-colors sm:col-span-2">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h4 className="font-semibold text-white mb-1">E-posta</h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  info@gymm.com | uyelik@gymm.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
