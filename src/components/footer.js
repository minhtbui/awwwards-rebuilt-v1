import React from "react"

// styled component
import { Container, Flex } from "../styles/globalStyles"
import { FooterContent, FooterNav, FooterSocial } from "../styles/footerStyles"

// icons
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons"

//custom hook
import useElementPosition from "../hooks/useElementPosition"

const Footer = ({ onCursor }) => {
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
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            >
              <Instagram />
            </a>
            <a
              href="/"
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={onCursor}
            >
              <Facebook />
            </a>
            <a
              href="/"
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
