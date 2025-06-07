
import { useState, useEffect } from 'react'

const SIDEBAR_STORAGE_KEY = 'veegox-sidebar-state'

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return saved ? JSON.parse(saved) : false
  })

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY + '-collapsed')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isOpen))
  }, [isOpen])

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY + '-collapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggle = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed)

  return {
    isOpen,
    isCollapsed,
    toggle,
    open,
    close,
    toggleCollapsed,
    setIsOpen,
    setIsCollapsed
  }
}
