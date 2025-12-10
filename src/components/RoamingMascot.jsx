import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RoamingMascot = () => {
  const [positionX, setPositionX] = useState(50)
  const [isTickled, setIsTickled] = useState(false)
  const [currentExpression, setCurrentExpression] = useState('')
  const [showExpression, setShowExpression] = useState(false)
  const [lastSection, setLastSection] = useState('')

  const expressions = [
    "Hello! 👋", "Nice code! 💻", "Hire me! 😊", "Let's build! 🚀",
    "Coffee? ☕", "Bug free! 🐛", "Git push! 📤", "Woohoo! 🎉",
    "React! ⚛️", "Coding... 🤓", "Hi there! 👀", "Yo! ✌️",
    "💃 Dancing!", "🕺 Groove!", "🎵 La la la~", "🎶 Vibing!",
    "✨ Sparkle!", "🔥 On fire!",
  ]

  const tickleExpressions = [
    "Hehe! 😆", "Stop it! 🤭", "Tehehe! 😝",
    "Tickles! 🤣", "Wahaha! 😂", "Nooo! 🙈",
  ]

  const sectionMessages = {
    home: ["Welcome! 🏠", "Nice to meet you!", "Hey there! 👋"],
    skills: ["I know these! 🎯", "Cool tech stack! 💻", "Skills unlocked! 🔓"],
    experience: ["Work history! 💼", "Experienced dev! 👨‍💻", "Career journey! 🚀"],
    education: ["Smart cookie! 🎓", "Knowledge! 📚", "Learning never stops!"],
    projects: ["Check these out! 👀", "Built with ❤️", "Cool projects! 🛠️"],
    contact: ["Let's connect! 📧", "Hire me! 🤝", "Say hello! 💬"]
  }

  const scrollMessages = [
    { at: 25, msg: "Curious? Keep going! 📜" },
    { at: 50, msg: "Halfway there! 🎯" },
    { at: 75, msg: "Almost done! 💪" },
    { at: 95, msg: "Thanks for visiting! 🙏" }
  ]

  const handleTickle = () => {
    setIsTickled(true)
    setCurrentExpression(tickleExpressions[Math.floor(Math.random() * tickleExpressions.length)])
    setShowExpression(true)
    setTimeout(() => {
      setIsTickled(false)
      setShowExpression(false)
    }, 1000)
  }

  useEffect(() => {
    let lastProgress = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.round((scrollTop / docHeight) * 100)

      scrollMessages.forEach(({ at, msg }) => {
        if (lastProgress < at && progress >= at) {
          setCurrentExpression(msg)
          setShowExpression(true)
          setTimeout(() => setShowExpression(false), 3000)
        }
      })
      lastProgress = progress

      const sections = ['home', 'skills', 'experience', 'education', 'projects', 'contact']
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            if (lastSection !== id) {
              setLastSection(id)
              const msgs = sectionMessages[id]
              if (msgs && Math.random() > 0.5) {
                setCurrentExpression(msgs[Math.floor(Math.random() * msgs.length)])
                setShowExpression(true)
                setTimeout(() => setShowExpression(false), 2500)
              }
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastSection])

  useEffect(() => {
    const expressionInterval = setInterval(() => {
      if (!isTickled && !showExpression) {
        setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)])
        setShowExpression(true)
        setTimeout(() => setShowExpression(false), 2500)
      }
    }, 5000)
    return () => clearInterval(expressionInterval)
  }, [isTickled, showExpression])

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (isTickled) return
      setPositionX(prev => {
        const moveAmount = (Math.random() * 200) + 100
        const moveDirection = Math.random() > 0.5 ? 1 : -1
        let newX = prev + (moveAmount * moveDirection)
        const maxX = window.innerWidth - 100
        if (newX < 50) newX = 50
        else if (newX > maxX) newX = maxX
        return newX
      })
    }, 3000)
    return () => clearInterval(moveInterval)
  }, [isTickled])

  return (
    <motion.div
      className="roaming-mascot"
      animate={{ x: positionX }}
      transition={{ type: "spring", stiffness: 50, damping: 20, duration: 2 }}
      onClick={handleTickle}
    >
      <motion.div 
        className={`mascot-character ${isTickled ? 'tickled' : ''}`}
        animate={isTickled ? {
          rotate: [-10, 10, -10, 10, -10, 10, 0],
          y: [0, -15, 0, -10, 0, -5, 0]
        } : {
          y: [0, -8, 0, -5, 0],
          rotate: [-3, 3, -3, 3, 0],
          scale: [1, 1.05, 1, 1.03, 1]
        }}
        transition={isTickled ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {showExpression && (
          <>
            {isTickled && (
              <>
                <motion.span className="tickle-sparkle" initial={{ opacity: 0, scale: 0, x: -20, y: -20 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: -30, y: -40 }} transition={{ duration: 0.5 }}>✨</motion.span>
                <motion.span className="tickle-sparkle" initial={{ opacity: 0, scale: 0, x: 20, y: -20 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: 30, y: -35 }} transition={{ duration: 0.5, delay: 0.1 }}>⭐</motion.span>
              </>
            )}
            <motion.div className="mascot-speech" initial={{ opacity: 0, scale: 0.5, y: 0 }} animate={{ opacity: 1, scale: 1, y: -10 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }}>
              {currentExpression}
            </motion.div>
          </>
        )}
        <div className="mascot-body-roam">
          <div className="mascot-face-roam">
            <div className="mascot-eyes-roam">
              {isTickled ? (
                <>
                  <span className="eye-roam happy">^</span>
                  <span className="eye-roam happy">^</span>
                </>
              ) : (
                <>
                  <motion.span className="eye-roam" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }} />
                  <motion.span className="eye-roam" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }} />
                </>
              )}
            </div>
            <div className="mascot-cheeks">
              <span className={`cheek ${isTickled ? 'blushing' : ''}`}></span>
              <span className={`cheek ${isTickled ? 'blushing' : ''}`}></span>
            </div>
            <div className={`mascot-smile ${isTickled ? 'big-smile' : ''}`}></div>
          </div>
        </div>
        <motion.div 
          className="mascot-legs"
          animate={isTickled ? { rotate: [-20, 20, -20, 20, -20] } : { rotate: [-12, 12, -12], y: [0, -2, 0] }}
          transition={{ duration: isTickled ? 0.15 : 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="leg"></span>
          <span className="leg"></span>
        </motion.div>
      </motion.div>
      <div className="mascot-shadow"></div>
    </motion.div>
  )
}

export default RoamingMascot



