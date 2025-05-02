
import * as React from "react"

// Increased mobile breakpoint to ensure optimizations apply to more devices
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Use state initialization function to avoid extra calculations during render
  const [isMobile, setIsMobile] = React.useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Cache DOM query and window.innerWidth for better performance
    let lastWidth = window.innerWidth;
    
    // Use more aggressive debounce for mobile devices to reduce processing
    const checkMobile = () => {
      const currentWidth = window.innerWidth;
      
      // Only update state if the breakpoint threshold was actually crossed
      if ((lastWidth < MOBILE_BREAKPOINT && currentWidth >= MOBILE_BREAKPOINT) || 
          (lastWidth >= MOBILE_BREAKPOINT && currentWidth < MOBILE_BREAKPOINT)) {
        setIsMobile(currentWidth < MOBILE_BREAKPOINT);
      }
      
      lastWidth = currentWidth;
    }
    
    // Use longer debounce time on mobile for better performance
    let timeoutId: number | null = null;
    const debouncedResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkMobile, isMobile ? 150 : 100);
    };
    
    // Initial check
    checkMobile()
    
    // Add event listener with passive option for improved performance
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
    let lastWidth = window.innerWidth;
    
    const updateMediaQueries = () => {
      const width = window.innerWidth;
      
      // Only update if there's actually a meaningful change
      if (Math.abs(width - lastWidth) > 50) {
        setMediaQueries({
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024 && width < 1280,
          isLargeDesktop: width >= 1280
        });
        
        lastWidth = width;
      }
    }

    // More aggressive debounce for better performance
    const debouncedResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      // Longer timeout for better performance
      timeoutId = window.setTimeout(updateMediaQueries, 150);
    };

    // Initial check
    updateMediaQueries()
    
    // Add event listener with passive option for better performance
    window.addEventListener('resize', debouncedResize, { passive: true })
    
    // Clean up
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return mediaQueries
}
