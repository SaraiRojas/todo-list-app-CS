import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import { TaskProvider } from '../context/TaskContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Todo list application',
  description:
    'Application to create a list of tasks that you want or need to do',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <TaskProvider>
           {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
