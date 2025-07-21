import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Play, Mail, Github, Linkedin, Instagram, Twitter, ExternalLink, Star } from 'lucide-react'
import { useContent, getEmbedUrl, getThumbnail } from './hooks/useContent'
import './App.css'

function App() {
  const { content, loading, error } = useContent()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const openVideoModal = (video) => {
    setSelectedVideo({
      ...video,
      embedUrl: getEmbedUrl(video.embedUrl, true, true)
    })
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  const getFilteredVideos = () => {
    if (!content?.videos) return []
    if (filter === 'all') return content.videos
    if (filter === 'featured') return content.videos.filter(video => video.featured)
    return content.videos.filter(video => video.category.toLowerCase() === filter.toLowerCase())
  }

  const getUniqueCategories = () => {
    if (!content?.videos) return []
    const categories = content.videos.map(video => video.category)
    return [...new Set(categories)]
  }

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="h-6 w-6" />
      case 'linkedin': return <Linkedin className="h-6 w-6" />
      case 'instagram': return <Instagram className="h-6 w-6" />
      case 'twitter': return <Twitter className="h-6 w-6" />
      default: return <ExternalLink className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-500 mb-4">Error loading portfolio content</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!content) return null

  return (
    <div className="min-h-screen transition-all duration-500 dark">
      <div className="pattern-dots min-h-screen" style={{ background: 'var(--background)' }}>
        
        {/* Hero Section */}
        <section className="hero-gradient min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto fade-in">
            <div className="glass-card rounded-3xl p-12 mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {content.personal.name}
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
                {content.personal.title}
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {content.personal.bio}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button className="glossy-button px-8 py-3 text-lg" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button variant="outline" className="glass-card px-8 py-3 text-lg border-2" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
                View Work
              </Button>
            </div>
          </div>
        </section>

        {/* Rest of your sections remain unchanged... */}
        {/* Work, About, Testimonials, Contact, Footer, Video Modal */}

      </div>
    </div>
  )
}

export default App
