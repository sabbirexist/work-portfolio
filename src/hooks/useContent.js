import { useState, useEffect } from 'react'

export const useContent = () => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/content.json')
        if (!response.ok) {
          throw new Error('Failed to load content')
        }
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err.message)
        console.error('Error loading content:', err)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return { content, loading, error }
}

// Helper function to get video embed URL from various platforms
export const getEmbedUrl = (url, autoplay = false, mute = false) => {
  let embedUrl = url
  
  // YouTube
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    embedUrl = `https://www.youtube.com/embed/${videoId}`
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    embedUrl = `https://www.youtube.com/embed/${videoId}`
  }
  // Vimeo
  else if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    embedUrl = `https://player.vimeo.com/video/${videoId}`
  }
  // If already an embed URL, use as is
  else if (url.includes('/embed/') || url.includes('player.vimeo.com')) {
    embedUrl = url
  }

  // Add autoplay and mute parameters if not already present
  if (autoplay || mute) {
    const separator = embedUrl.includes('?') ? '&' : '?'
    const params = []
    
    if (autoplay && !embedUrl.includes('autoplay=')) {
      params.push('autoplay=1')
    }
    if (mute && !embedUrl.includes('mute=')) {
      params.push('mute=1')
    }
    
    if (params.length > 0) {
      embedUrl += separator + params.join('&')
    }
  }

  return embedUrl
}

// Helper function to get thumbnail from video URL
export const getThumbnail = (url, customThumbnail = null) => {
  if (customThumbnail) return customThumbnail

  // YouTube thumbnail
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // Vimeo thumbnail (requires API call, so return placeholder)
  if (url.includes('vimeo.com/')) {
    return 'https://via.placeholder.com/640x360/1e293b/ffffff?text=Vimeo+Video'
  }

  // Default placeholder
  return 'https://via.placeholder.com/640x360/1e293b/ffffff?text=Video+Thumbnail'
}

