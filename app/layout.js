import './globals.css'

export const metadata = {
  title: 'TTS Translator',
  description: 'Text-to-Speech Translation Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800">TTS Translator</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
