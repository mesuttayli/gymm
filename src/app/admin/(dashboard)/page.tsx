import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Users, Package, Mail, Calendar, TrendingUp, Clock } from 'lucide-react'

async function getDashboardStats() {
  const [
    servicesCount,
    trainersCount,
    messagesCount,
    unreadMessagesCount,
    registrationsCount,
    pendingRegistrations,
    galleryCount,
    schedulesCount
  ] = await Promise.all([
    prisma.service.count({ where: { isActive: true } }),
    prisma.trainer.count({ where: { isActive: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.registration.count(),
    prisma.registration.count({ where: { status: 'pending' } }),
    prisma.galleryImage.count({ where: { isActive: true } }),
    prisma.schedule.count({ where: { isActive: true } }),
  ])

  return {
    servicesCount,
    trainersCount,
    messagesCount,
    unreadMessagesCount,
    registrationsCount,
    pendingRegistrations,
    galleryCount,
    schedulesCount,
  }
}

async function getRecentMessages() {
  return prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })
}

async function getRecentRegistrations() {
  return prisma.registration.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const [stats, recentMessages, recentRegistrations] = await Promise.all([
    getDashboardStats(),
    getRecentMessages(),
    getRecentRegistrations(),
  ])

  const statCards = [
    {
      title: 'Aktif Hizmetler',
      value: stats.servicesCount,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Antrenorler',
      value: stats.trainersCount,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Okunmamis Mesaj',
      value: stats.unreadMessagesCount,
      icon: Mail,
      color: 'bg-yellow-500',
      subtitle: `Toplam: ${stats.messagesCount}`,
    },
    {
      title: 'Bekleyen Basvuru',
      value: stats.pendingRegistrations,
      icon: TrendingUp,
      color: 'bg-[var(--accent-primary)]',
      subtitle: `Toplam: ${stats.registrationsCount}`,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[var(--foreground-muted)] mt-1">
          Hos geldiniz, {session.user?.name}! Iste site ozeti.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[var(--foreground-muted)] text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-[var(--foreground-dim)] mt-1">{stat.subtitle}</p>
                )}
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--accent-primary)]" />
              Son Mesajlar
            </h2>
            <a
              href="/admin/messages"
              className="text-sm text-[var(--accent-primary)] hover:underline"
            >
              Tumunu Gor
            </a>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentMessages.length === 0 ? (
              <p className="p-6 text-[var(--foreground-muted)] text-center">
                Henuz mesaj yok
              </p>
            ) : (
              recentMessages.map((message) => (
                <div key={message.id} className="p-4 hover:bg-[var(--background-secondary)] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white truncate">{message.name}</p>
                        {!message.isRead && (
                          <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)] truncate">
                        {message.email}
                      </p>
                      <p className="text-sm text-[var(--foreground-dim)] truncate mt-1">
                        {message.message || 'Mesaj yok'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--foreground-dim)]">
                      <Clock className="w-3 h-3" />
                      {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-xl">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--accent-primary)]" />
              Son Basvurular
            </h2>
            <a
              href="/admin/messages"
              className="text-sm text-[var(--accent-primary)] hover:underline"
            >
              Tumunu Gor
            </a>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentRegistrations.length === 0 ? (
              <p className="p-6 text-[var(--foreground-muted)] text-center">
                Henuz basvuru yok
              </p>
            ) : (
              recentRegistrations.map((reg) => (
                <div key={reg.id} className="p-4 hover:bg-[var(--background-secondary)] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white truncate">{reg.name}</p>
                      <p className="text-sm text-[var(--foreground-muted)] truncate">
                        {reg.phone}
                      </p>
                      {reg.packageType && (
                        <span className="inline-block text-xs bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-2 py-1 rounded mt-1">
                          {reg.packageType}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded ${
                          reg.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : reg.status === 'contacted'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {reg.status === 'pending' ? 'Bekliyor' : reg.status === 'contacted' ? 'Iletisime Gecildi' : 'Tamamlandi'}
                      </span>
                      <p className="text-xs text-[var(--foreground-dim)] mt-1">
                        {new Date(reg.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: '/admin/services', label: 'Hizmet Ekle', icon: Package },
          { href: '/admin/trainers', label: 'Antrenor Ekle', icon: Users },
          { href: '/admin/gallery', label: 'Gorsel Ekle', icon: Calendar },
          { href: '/', label: 'Siteyi Gor', icon: TrendingUp },
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href === '/' ? '_blank' : undefined}
            rel={link.href === '/' ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl hover:border-[var(--accent-primary)] transition-colors"
          >
            <link.icon className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="font-medium text-white">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
