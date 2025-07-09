
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with false to default to desktop view
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
    }
    
    // Add debounce for resize events to reduce frequent updates
    let timeoutId: number | null = null;
    const debouncedResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkMobile, 100);
    };
    
    // Initial check after component mounts
    checkMobile()
    
    // Add event listener with passive option for performance
    window.addEventListener('resize', debouncedResize, { passive: true })
    
    // Clean up
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return isMobile
}

// Additional hook to get various device sizes with optimized performance
export function useMediaQuery() {
  const [mediaQueries, setMediaQueries] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    let timeoutId: number | null = null;
    
    const updateMediaQueries = () => {
      const width = window.innerWidth
      setMediaQueries({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLargeDesktop: width >= 1280
      })
    }

    // Debounced resize handler for better performance
    const debouncedResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateMediaQueries, 100);
    };

    // Initial check after component mounts
    updateMediaQueries()
    
    // Add event listener with passive option for performance
    window.addEventListener('resize', debouncedResize, { passive: true })
    
    // Clean up
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return mediaQueries
}
