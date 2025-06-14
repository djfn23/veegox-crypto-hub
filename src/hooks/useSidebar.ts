
import { useState, useCallback } from 'react'

interface SidebarState {
  isOpen: boolean
}

export const useSidebar = () => {
  const [state, setState] = useState<SidebarState>({ isOpen: false })

  const toggle = useCallback(() => {
    setState(prev => ({ isOpen: !prev.isOpen }))
  }, [])

  const open = useCallback(() => {
    setState({ isOpen: true })
  }, [])

  const close = useCallback(() => {
    setState({ isOpen: false })
  }, [])

  const setIsOpen = useCallback((isOpen: boolean) => {
    setState({ isOpen })
  }, [])

  return {
    isOpen: state.isOpen,
    toggle,
    open,
    close,
    setIsOpen
  }
}
