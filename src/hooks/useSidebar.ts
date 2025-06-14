
import { useState, useEffect, useCallback } from 'react'

const SIDEBAR_STORAGE_KEY = 'veegox-sidebar-state'

interface SidebarState {
  isOpen: boolean
  isAnimating: boolean
}

export const useSidebar = () => {
  const [state, setState] = useState<SidebarState>(() => {
    if (typeof window === 'undefined') return { isOpen: false, isAnimating: false }
    
    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      return { 
        isOpen: saved ? JSON.parse(saved) : false,
        isAnimating: false
      }
    } catch {
      return { isOpen: false, isAnimating: false }
    }
  })

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(state.isOpen))
    } catch (error) {
      console.warn('Failed to save sidebar state:', error)
    }
  }, [state.isOpen])

  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isAnimating: true }))
    
    // Add small delay for animation
    setTimeout(() => {
      setState(prev => ({ 
        isOpen: !prev.isOpen, 
        isAnimating: false 
      }))
    }, 50)
  }, [])

  const open = useCallback(() => {
    setState(prev => ({ ...prev, isAnimating: true }))
    setTimeout(() => {
      setState({ isOpen: true, isAnimating: false })
    }, 50)
  }, [])

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isAnimating: true }))
    setTimeout(() => {
      setState({ isOpen: false, isAnimating: false })
    }, 50)
  }, [])

  const setIsOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, isAnimating: true }))
    setTimeout(() => {
      setState({ isOpen: open, isAnimating: false })
    }, 50)
  }, [])

  return {
    isOpen: state.isOpen,
    isAnimating: state.isAnimating,
    toggle,
    open,
    close,
    setIsOpen
  }
}
