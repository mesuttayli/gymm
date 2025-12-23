'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Package } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  price: string | null
  duration: string | null
  features: string
  icon: string | null
  order: number
  isActive: boolean
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: '',
    icon: '',
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: JSON.stringify(formData.features.split(',').map(f => f.trim()).filter(Boolean))
        })
      })

      if (response.ok) {
        fetchServices()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price || '',
      duration: service.duration || '',
      features: JSON.parse(service.features || '[]').join(', '),
      icon: service.icon || '',
      order: service.order,
      isActive: service.isActive
    })
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediginize emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: '',
      icon: '',
      order: 0,
      isActive: true
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-7 h-7 text-[var(--accent-primary)]" />
            Hizmetler
          </h1>
          <p className="text-[var(--foreground-muted)] mt-1">
            Hizmet ve uyelik paketlerini yonetin
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          Yeni Hizmet
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Hizmeti Duzenle' : 'Yeni Hizmet Ekle'}
              </h2>
              <button onClick={resetForm} className="text-[var(--foreground-muted)] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Baslik *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="input"
                    placeholder="Ornek: Kisisel Antrenman"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ikon</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="input"
                    placeholder="Ornek: dumbbell"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Aciklama *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="input resize-none"
                  placeholder="Hizmet aciklamasi..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Fiyat</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input"
                    placeholder="Ornek: 799 TL/ay"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Sure</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="input"
                    placeholder="Ornek: 60 dk"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ozellikler (virgul ile ayirin)
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="input"
                  placeholder="Ornek: Ozel Program, Beslenme Danismanligi, Takip"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Siralama</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="input"
                  />
                </div>
                <div className="flex items-center gap-3 pt-8">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-[var(--border)] bg-[var(--background-secondary)]"
                  />
                  <label htmlFor="isActive" className="text-white">Aktif</label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Iptal
                </button>
                <button type="submit" className="btn-primary flex-1">
                  <Save className="w-5 h-5" />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-[var(--foreground-dim)] mx-auto mb-4" />
            <p className="text-[var(--foreground-muted)]">Henuz hizmet eklenmemis</p>
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4">
              <Plus className="w-5 h-5" />
              Ilk Hizmeti Ekle
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {services.map((service) => (
              <div key={service.id} className="p-4 hover:bg-[var(--background-secondary)] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      {!service.isActive && (
                        <span className="text-xs bg-[var(--foreground-dim)]/20 text-[var(--foreground-dim)] px-2 py-0.5 rounded">
                          Pasif
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1 line-clamp-2">
                      {service.description}
                    </p>
                    {service.price && (
                      <p className="text-sm text-[var(--accent-primary)] mt-1">{service.price}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-[var(--foreground-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
