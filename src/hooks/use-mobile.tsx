
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Additional hook to get various device sizes
export function useMediaQuery() {
  const [mediaQueries, setMediaQueries] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const updateMediaQueries = () => {
      const width = window.innerWidth
      setMediaQueries({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLargeDesktop: width >= 1280
      })
    }

    // Initial check
    updateMediaQueries()
    
    // Add event listener for resize
    window.addEventListener('resize', updateMediaQueries)
    
    // Clean up
    return () => window.removeEventListener('resize', updateMediaQueries)
  }, [])

  return mediaQueries
}
