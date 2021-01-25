import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"

//styled component
import { HeaderNav, Logo, Menu } from "../styles/headerStyles.js"
import { Container, Flex } from "../styles/globalStyles.js"

// context
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext"

// custom hook
import useElementPosition from "../hooks/useElementPosition"

const Header = ({
  onCursor,
  toggleMenu,
  setToggleMenu,
  hamburgerPos,
  setHamburgerPos,
}) => {
  const dispatch = useGlobalDispatchContext()
  const { currentTheme } = useGlobalStateContext()
  const hamburger = useRef(null)
  const position = useElementPosition(hamburger)

  const toggleTheme = () => {
    currentTheme === "dark"
      ? dispatch({ type: "TOGGLE_THEME", theme: "light" })
      : dispatch({ type: "TOGGLE_THEME", theme: "dark" })
  }

  const menuHover = () => {
    onCursor("locked")
    setHamburgerPos({ x: position.x, y: position.y + 72 })
  }

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])

  return (
    <HeaderNav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
          >
            <Link to="/">FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={() => onCursor("hovered")}
            ></span>
            <Link to="/">W</Link>
          </Logo>
          <Menu
            ref={hamburger}
            onClick={() => {
              setToggleMenu(!toggleMenu)
            }}
            onMouseEnter={menuHover}
            onMouseLeave={onCursor}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header
