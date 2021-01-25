import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"

// style component
import { Container, Flex } from "../styles/globalStyles"
import {
  Nav,
  NavHeader,
  CloseNav,
  NavList,
  NavFooter,
  NavVideos,
} from "../styles/navStyles"
import { FooterContent, FooterSocial } from "../styles/footerStyles"

// icons
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons"

const navRoutes = [
  {
    id: 0,
    title: "not humble",
    path: "/not-humble",
    video: "featured-video.mp4",
  },
  { id: 1, title: "bleeping easy", path: "/bleeping-easy", video: "easy.mp4" },
  {
    id: 2,
    title: "make it zero",
    path: "/make-it-zero",
    video: "make-it-zero.mp4",
  },
  {
    id: 3,
    title: "it takes an island",
    path: "/it-takes-an-island",
    video: "it-takes-an-island.mp4",
  },
  { id: 4, title: "50 beaches", path: "/50-beaches", video: "50-beaches.mp4" },
]

const Navigation = ({ toggleMenu, setToggleMenu, onCursor }) => {
  const [showVideo, setShowVideo] = useState({
    show: false,
    video: "featured-video.mp4",
    key: "0",
  })

  return (
    <>
      <AnimatePresence>
        {toggleMenu && (
          <Nav
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: toggleMenu ? 0 : "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.6, 0.05, -0.01, 0.9],
            }}
          >
            <Container>
              <NavHeader>
                <Flex spaceBetween noHeight>
                  <h2>Projects</h2>
                  <CloseNav
                    onClick={() => setToggleMenu(!toggleMenu)}
                    onMouseEnter={() => {
                      onCursor("pointer")
                    }}
                    onMouseLeave={onCursor}
                  >
                    <button>
                      <motion.span
                        initial={{ rotate: 0, y: 0, opacity: 0 }}
                        animate={{ rotate: 45, y: 8, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          duration: 0.8,
                          ease: [0.6, 0.05, -0.01, 0.9],
                        }}
                      ></motion.span>
                      <motion.span
                        initial={{ rotate: 0, y: 0, opacity: 0 }}
                        animate={{ rotate: -45, y: -8, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          duration: 0.8,
                          ease: [0.6, 0.05, -0.01, 0.9],
                        }}
                      ></motion.span>
                    </button>
                  </CloseNav>
                </Flex>
              </NavHeader>
              <NavList>
                <ul>
                  {navRoutes.map((route) => (
                    <motion.li
                      key={route.id}
                      onMouseEnter={() => {
                        onCursor("pointer")
                      }}
                      onMouseLeave={onCursor}
                    >
                      <Link to={`/projects/${route.path}`}>
                        <motion.div
                          className="link"
                          initial={{ x: -108 }}
                          whileHover={{ x: -40 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.6, 0.05, -0.01, 0.9],
                          }}
                          onHoverStart={() =>
                            setShowVideo({
                              show: true,
                              video: route.video,
                              key: route.id,
                            })
                          }
                          onHoverEnd={() =>
                            setShowVideo({
                              show: false,
                              video: route.video,
                              key: route.id,
                            })
                          }
                        >
                          <span className="arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 101 57"
                            >
                              <path
                                d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                fill="#FFF"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          {route.title}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </NavList>
              <NavFooter>
                <Flex spaceBetween>
                  <FooterContent>
                    <p>000.000.0000</p>
                  </FooterContent>

                  <FooterContent wider>
                    <p>google@gmail.com</p>
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
              </NavFooter>
              <NavVideos>
                <motion.div
                  animate={{ width: showVideo.show ? 0 : "100%" }}
                  className="reveal"
                ></motion.div>
                <div className="video">
                  <AnimatePresence initial={false} exitBeforeEnter>
                    <motion.video
                      key={showVideo.key}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                      src={require(`../assets/video/${showVideo.video}`)}
                      loop
                      autoPlay
                      muted
                    />
                  </AnimatePresence>
                </div>
              </NavVideos>
            </Container>
          </Nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
