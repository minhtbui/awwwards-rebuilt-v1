import React, { useEffect, useRef } from "react"

// styled component
import {
  Banner,
  Video,
  Canvas,
  BannerTitle,
  HeadLine,
} from "../../styles/homeStyles"

// custom Hook
import useWindowSize from "../../hooks/useWindowSize"

// context
import { useGlobalStateContext } from "../../context/globalContext"

const HomeBanner = ({ onCursor }) => {
  const { currentTheme } = useGlobalStateContext()
  let canvas = useRef(null)
  const size = useWindowSize()

  useEffect(() => {
    let renderingElement = canvas.current
    let drawingELement = renderingElement.cloneNode()

    let drawingCtx = drawingELement.getContext("2d")
    let renderingCtx = renderingElement.getContext("2d")

    let lastX
    let lastY

    let moving = false
    renderingCtx.globalCompositeOperation = "source-over"
    renderingCtx.fillStyle = currentTheme === "dark" ? "#000" : "#fff"
    renderingCtx.fillRect(0, 0, size.width, size.height)

    renderingElement.addEventListener("mouseover", e => {
      moving = true
      lastX = e.pageX - renderingElement.offsetLeft
      lastY = e.pageY - renderingElement.offsetTop
    })
    renderingElement.addEventListener("mouseup", e => {
      moving = false
      lastX = e.pageX - renderingElement.offsetLeft
      lastY = e.pageY - renderingElement.offsetTop
    })
    renderingElement.addEventListener("mousemove", e => {
      if (moving) {
        drawingCtx.globalCompositeOperation = "source-over"
        renderingCtx.globalCompositeOperation = "destination-out"
        let currentX = e.pageX - renderingElement.offsetLeft
        let currentY = e.pageY - renderingElement.offsetTop
        drawingCtx.lineJoin = "round"
        drawingCtx.moveTo(lastX, lastY)
        drawingCtx.lineTo(currentX, currentY)
        drawingCtx.closePath()
        drawingCtx.lineWidth = 60
        drawingCtx.stroke()
        lastX = currentX
        lastY = currentY
        renderingCtx.drawImage(drawingELement, 0, 0)
      }
    })
  }, [currentTheme])

  const parent = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  const child = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  }

  return (
    <Banner>
      <Video>
        <video
          src={require("../../assets/video/video.mp4")}
          height="100%"
          width="100%"
          loop
          autoPlay
          muted
        ></video>
      </Video>
      <Canvas
        ref={canvas}
        height={size.height}
        width={size.width}
        onMouseEnter={() => onCursor("hovered")}
        onMouseLeave={onCursor}
      />
      <BannerTitle initial="initial" animate="animate" variants={parent}>
        <HeadLine variants={child}>DIG</HeadLine>
        <HeadLine variants={child}>DEEP</HeadLine>
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner
