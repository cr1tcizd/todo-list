import { useRef } from "react"

export const handleClickOut = (onOutsideClick) => {
  const ref = useRef(null)
  const toolRef = useRef(null)

  useEffect(() => {
    const handleClickOut = (e) => {
      if (!ref.current.contains(e.target) && !toolRef.current.contains(e.target)) {
        setDisplayPalette({display: 'none'})
        onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handleClickOut)
    return () => {
      document.removeEventListener('mousedown', handleClickOut)
    }
  }, [onOutsideClick])
  return ref;
}

