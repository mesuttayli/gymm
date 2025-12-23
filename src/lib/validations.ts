import { z } from 'zod'

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Ad en az 2 karakter olmali')
    .max(100, 'Ad en fazla 100 karakter olmali')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf icermeli'),
  email: z.string()
    .email('Gecerli bir e-posta adresi girin')
    .max(255, 'E-posta en fazla 255 karakter olmali'),
  phone: z.string()
    .regex(/^[0-9\s\-\+\(\)]*$/, 'Gecerli bir telefon numarasi girin')
    .max(20, 'Telefon numarasi en fazla 20 karakter olmali')
    .optional()
    .or(z.literal('')),
  package: z.string().max(50).optional().or(z.literal('')),
  message: z.string()
    .max(2000, 'Mesaj en fazla 2000 karakter olmali')
    .optional()
    .or(z.literal('')),
})

// Service validation
export const serviceSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  price: z.string().max(50).optional().nullable(),
  duration: z.string().max(50).optional().nullable(),
  features: z.string().max(2000),
  icon: z.string().max(50).optional().nullable(),
  order: z.number().int().min(0).max(1000),
  isActive: z.boolean(),
})

// Trainer validation
export const trainerSchema = z.object({
  name: z.string().min(2).max(100),
  specialty: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().url().optional().nullable().or(z.literal('')),
  instagram: z.string().url().optional().nullable().or(z.literal('')),
  order: z.number().int().min(0).max(1000),
  isActive: z.boolean(),
})

// Login validation
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ServiceData = z.infer<typeof serviceSchema>
export type TrainerData = z.infer<typeof trainerSchema>
export type LoginData = z.infer<typeof loginSchema>
