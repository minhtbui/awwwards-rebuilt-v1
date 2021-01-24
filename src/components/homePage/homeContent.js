import React, { useEffect } from "react"

// scroll behavior
import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"

// styled component
import { Container } from "../../styles/globalStyles"
import { HomeContentSection, Content } from "../../styles/homeStyles"

const HomeContent = () => {
  const animation = useAnimation()
  const [contentRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-300px",
  })

  useEffect(() => {
    if (inView) {
      animation.start("visible")
    }
  }, [animation, inView])

  return (
    <HomeContentSection
      ref={contentRef}
      animate={animation}
      initial="hidden"
      variants={variants}
    >
      <Container>
        <Content>
          Great stories don't just happen- <br />
          they need to be uncovered. And we dig deep to discover the great
          stories that lie just below the surface. Dirt under our fingernails
          and all.
        </Content>
      </Container>
    </HomeContentSection>
  )
}

//animation
const variants = {
  hidden: {
    opacity: 0,
    y: 72,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] },
  },
}

export default HomeContent
