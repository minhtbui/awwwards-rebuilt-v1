import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// styled component
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { normalize } from "styled-normalize" //reset style

// component
import Header from "./header"
import Cursor from "./customCursor"
import Nav from "./nav"

// context
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext"

const GlobalStyle = createGlobalStyle`
${normalize}
  *{
    text-decoration:none;
    cursor:none;
  }
  html{
    box-sizing:border-box;
    -webkit-font-smoothing: antialiased;
    font-size:16px
  }
  body{
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior:none;
    overflow-x:hidden
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
  }

  const ligthTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
  }

  const { currentTheme, cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [toggleMenu, setToggleMenu] = useState(false)

  const onCursor = cursorType => {
    // set cursorType in Global Context
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : ligthTheme}>
      <GlobalStyle />
      <Cursor toggleMenu={toggleMenu} />

      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />

      <Nav
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />

      <main>{children}</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
