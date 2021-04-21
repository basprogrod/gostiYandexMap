import { useEffect, useState } from 'react'
import simpleDebounce from '../utils/simpleDebounce'

const updateWidth = simpleDebounce(300)

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  function handleResize(e) {
    updateWidth(setWidth, e.target.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
