import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gymm.com' },
    update: {},
    create: {
      email: 'admin@gymm.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create editor user
  const editorPassword = await hash('editor123', 12)
  const editor = await prisma.user.upsert({
    where: { email: 'editor@gymm.com' },
    update: {},
    create: {
      email: 'editor@gymm.com',
      password: editorPassword,
      name: 'Editor',
      role: 'editor',
    },
  })
  console.log('Created editor user:', editor.email)

  // Create sample services
  const services = [
    {
      title: 'Agirlik Calismalari',
      description: 'Profesyonel agirlik calismasi alaniyla kas gelistirme ve guc kazanma hedeflerinize ulasin.',
      price: null,
      duration: null,
      features: JSON.stringify(['Serbest Agirliklar', 'Makineler', 'Fonksiyonel Antrenman']),
      icon: 'dumbbell',
      order: 1,
    },
    {
      title: 'Cardio',
      description: 'Son teknoloji cardio ekipmanlarimizla dayaniklilik ve kondisyonunuzu gelistirin.',
      price: null,
      duration: null,
      features: JSON.stringify(['Kosu Bandlari', 'Eliptik Bisikletler', 'Kurekleri']),
      icon: 'heart',
      order: 2,
    },
    {
      title: 'Grup Dersleri',
      description: 'Enerjik grup dersleriyle motive olun ve birlikte ter dokelim.',
      price: null,
      duration: null,
      features: JSON.stringify(['Spinning', 'Yoga', 'Pilates', 'HIIT']),
      icon: 'users',
      order: 3,
    },
    {
      title: 'Kisisel Antrenman',
      description: 'Bire bir calismayla size ozel program ve surekli takip.',
      price: '1500 TL/seans',
      duration: '60 dk',
      features: JSON.stringify(['Ozel Program', 'Beslenme Danismanligi', 'Ilerleme Takibi']),
      icon: 'user',
      order: 4,
    },
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }
  console.log('Created sample services')

  // Create sample trainers
  const trainers = [
    {
      name: 'Ahmet Yilmaz',
      specialty: 'Guc & Kondisyon',
      description: '10 yillik deneyim ile profesyonel sporculara ve amatorlere antrenman veriyor.',
      instagram: 'https://instagram.com/ahmetyilmaz',
      order: 1,
    },
    {
      name: 'Elif Demir',
      specialty: 'Yoga & Pilates',
      description: 'Sertifikali yoga egitmeni. Zihin-beden baglantisi uzerine uzmanlasmis.',
      instagram: 'https://instagram.com/elifdemir',
      order: 2,
    },
    {
      name: 'Mehmet Kaya',
      specialty: 'Fonksiyonel Fitness',
      description: 'CrossFit Level 2 sertifikali. Rekabetci sporculara performans antremani.',
      instagram: 'https://instagram.com/mehmetkaya',
      order: 3,
    },
  ]

  for (const trainer of trainers) {
    await prisma.trainer.create({
      data: trainer,
    })
  }
  console.log('Created sample trainers')

  // Create working hours
  const days = [
    { day: 'Pazartesi', openTime: '06:00', closeTime: '23:00' },
    { day: 'Sali', openTime: '06:00', closeTime: '23:00' },
    { day: 'Carsamba', openTime: '06:00', closeTime: '23:00' },
    { day: 'Persembe', openTime: '06:00', closeTime: '23:00' },
    { day: 'Cuma', openTime: '06:00', closeTime: '23:00' },
    { day: 'Cumartesi', openTime: '08:00', closeTime: '20:00' },
    { day: 'Pazar', openTime: '09:00', closeTime: '18:00' },
  ]

  for (const dayData of days) {
    await prisma.workingHours.upsert({
      where: { day: dayData.day },
      update: dayData,
      create: dayData,
    })
  }
  console.log('Created working hours')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
