
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

  const setIsOpen = useCallback((open: boolean) => {
    setState({ isOpen: open })
  }, [])

  return {
    isOpen: state.isOpen,
    toggle,
    open,
    close,
    setIsOpen
  }
}
