import React, { useState, useEffect } from "react"

import { Cursor } from "../styles/globalStyles"

// context
import { useGlobalStateContext } from "../context/globalContext"

const CustomCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const [clicked, setClicked] = useState(false)
  const [mousePosition, setMousePosition] = useState({
    x: 100,
    y: 100,
  })

  const onMouseMove = (e) => {
    const { pageX: x, pageY: y } = e
    setMousePosition({ x, y })
  }

  const onMouseDown = () => {
    setClicked(true)
  }

  const onMouseUp = () => {
    setClicked(false)
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [])
  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} 
        ${cursorType} 
        ${toggleMenu ? "nav-open" : ""}
         ${clicked ? "clicked" : ""} `}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  )
}

export default CustomCursor
