import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Moon, Sun, Play, Mail, Github, Linkedin, Instagram, Twitter, ExternalLink, Star } from 'lucide-react'
import { useContent, getEmbedUrl, getThumbnail } from './hooks/useContent'
import './App.css'

function App() {
  const { content, loading, error } = useContent()
  const [isDark, setIsDark] = useState(true) // Default to dark mode (navy)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (content?.settings?.defaultTheme) {
      setIsDark(content.settings.defaultTheme === 'dark')
    }
  }, [content])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const openVideoModal = (video) => {
    setSelectedVideo({
      ...video,
      embedUrl: getEmbedUrl(video.embedUrl, true, true) // Enable autoplay and mute for inline playback
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
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      <div className="pattern-dots min-h-screen" style={{ background: 'var(--background)' }}>
        
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            onClick={toggleTheme}
            className="glossy-button rounded-full p-3"
            size="icon"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

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

        {/* Featured Work Section */}
        <section id="work" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 slide-up">
              <h2 className="text-5xl font-bold mb-6">Featured Work</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A showcase of my latest video editing projects, from commercials to documentaries
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                className={filter === 'all' ? 'glossy-button' : 'glass-card'}
                onClick={() => setFilter('all')}
              >
                All Work
              </Button>
              <Button
                variant={filter === 'featured' ? 'default' : 'outline'}
                className={filter === 'featured' ? 'glossy-button' : 'glass-card'}
                onClick={() => setFilter('featured')}
              >
                Featured
              </Button>
              {getUniqueCategories().map(category => (
                <Button
                  key={category}
                  variant={filter === category.toLowerCase() ? 'default' : 'outline'}
                  className={filter === category.toLowerCase() ? 'glossy-button' : 'glass-card'}
                  onClick={() => setFilter(category.toLowerCase())}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className={`grid gap-8 ${
              filter === 'reels' 
                ? 'reels-grid' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {getFilteredVideos().map((video, index) => (
                <Card 
                  key={video.id} 
                  className={`glass-card video-thumbnail cursor-pointer group ${
                    video.aspectRatio === '9:16' ? 'reel-card' : ''
                  }`}
                  onClick={() => openVideoModal(video)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={getThumbnail(video.embedUrl, video.thumbnail)} 
                        alt={video.title}
                        className={`w-full object-cover rounded-t-lg ${
                          video.aspectRatio === '9:16' 
                            ? 'reel-thumbnail' 
                            : 'h-48'
                        }`}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                        <div className={video.aspectRatio === '9:16' ? 'reel-play-button' : ''}>
                          <Play className={`text-white ${video.aspectRatio === '9:16' ? 'h-6 w-6' : 'h-12 w-12'}`} />
                        </div>
                      </div>
                      {video.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </div>
                      )}
                      {/* Category badge */}
                      <div className={`category-badge category-${video.category.toLowerCase().replace(' ', '-')}`}>
                        {video.category === 'Reels' ? '📱' : '🎬'} {video.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                        <span>{video.client}</span>
                        <span>{video.duration}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {video.role} • {video.year}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 hero-gradient">
          <div className="max-w-6xl mx-auto slide-up">
            <div className="glass-card rounded-3xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-8">About Me</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {content.about.description}
                </p>
              </div>

              {content.settings.showSkills && (
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Skills</h3>
                    <div className="flex flex-wrap gap-3">
                      {content.about.skills.map(skill => (
                        <span key={skill} className="glass-card px-4 py-2 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Software</h3>
                    <div className="flex flex-wrap gap-3">
                      {content.about.software.map(software => (
                        <span key={software} className="glass-card px-4 py-2 rounded-full text-sm">
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {content.settings.socialLinksEnabled && (
                <div className="flex justify-center gap-6 mt-12">
                  {Object.entries(content.personal.social).map(([platform, url]) => (
                    <a 
                      key={platform} 
                      href={url} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {content.settings.showTestimonials && content.testimonials.length > 0 && (
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 slide-up">
                <h2 className="text-4xl font-bold mb-6">What Clients Say</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {content.testimonials.map(testimonial => (
                  <Card key={testimonial.id} className="glass-card">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center slide-up">
            <h2 className="text-4xl font-bold mb-8">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to bring your vision to life? Let's discuss your next project.
            </p>
            <Button 
              className="glossy-button px-12 py-4 text-lg"
              onClick={() => window.location.href = `mailto:${content.personal.email}`}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6">
            <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">{selectedVideo.title}</h3>
                  <Button 
                    variant="ghost" 
                    onClick={closeVideoModal}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </Button>
                </div>
                
                {/* Dynamic aspect ratio container */}
                <div className={`mb-6 rounded-lg overflow-hidden ${
                  selectedVideo.aspectRatio === '9:16' 
                    ? 'aspect-[9/16] max-w-sm mx-auto' 
                    : 'aspect-video'
                }`}>
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                  />
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedVideo.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Client:</span> {selectedVideo.client}
                    </div>
                    <div>
                      <span className="font-semibold">Role:</span> {selectedVideo.role}
                    </div>
                    <div>
                      <span className="font-semibold">Tools:</span> {selectedVideo.tools}
                    </div>
                    <div>
                      <span className="font-semibold">Duration:</span> {selectedVideo.duration}
                    </div>
                  </div>
                  {selectedVideo.aspectRatio === '9:16' && (
                    <div className="text-center">
                      <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        📱 Vertical Content
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 {content.personal.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

