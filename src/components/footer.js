import React, { useRef } from "react"

// styled component
import { Container, Flex } from "../styles/globalStyles"
import { FooterContent, FooterNav, FooterSocial } from "../styles/footerStyles"

// icons
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons"

//custom hook
import useElementPosition from "../hooks/useElementPosition"

const Footer = ({ onCursor, setSocialPos }) => {
  const socialIcon = useRef(null)
  const position = useElementPosition(socialIcon)

  const socialHover = () => {
    onCursor("locked")
    setSocialPos({ x: position.x, y: position.y })
  }
  return (
    <FooterNav>
      <Container>
        <Flex spaceBetween>
          <FooterContent>
            <p>000.000.0000</p>
            <p>google@gmail.com</p>
          </FooterContent>

          <FooterContent wider>
            <p>Natural.st </p>
            <p>Earth</p>
          </FooterContent>

          <FooterSocial>
            <a
              href="/"
              ref={socialIcon}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            >
              <Instagram />
            </a>
            <a
              href="/"
              ref={socialIcon}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            >
              <Facebook />
            </a>
            <a
              href="/"
              ref={socialIcon}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            >
              <Vimeo />
            </a>
          </FooterSocial>
        </Flex>
      </Container>
    </FooterNav>
  )
}

export default Footer
