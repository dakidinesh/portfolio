import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './App.css'

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    
    setTimeout(() => setShowText(true), 300)
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div 
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        {/* Animated Logo/Icon */}
        <motion.div 
          className="loading-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <motion.span
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            💻
          </motion.span>
        </motion.div>
        
        {/* Name Animation */}
        {showText && (
          <motion.div className="loading-text">
            {"Dinesh Daki".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="loading-char"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        )}
        
        {/* Subtitle */}
        <motion.p 
          className="loading-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Software Engineer & Data Analyst
        </motion.p>
        
        {/* Progress Bar */}
        <div className="loading-bar-container">
          <motion.div 
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.span 
          className="loading-percent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress < 100 ? "Loading awesome stuff..." : "Let's go! 🚀"}
        </motion.span>
        
        {/* Floating Particles */}
        <div className="loading-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="loading-particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
import csufLogo from './assets/csuf-logo.png'
import gitamLogo from './assets/gitam-logo.png'
import replyquickLogo from './assets/replyquick-logo.png'
import phoenixLogo from './assets/phoenixglobal-logo.png'
import captionGenImage from './assets/caption_gen.png'
import emotionMusicImage from './assets/emotion_music_project.png'
import portfolioProjectImage from './assets/portfolio_project.png'

// Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, rotate: -180 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.svg
            key="sun"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Navigation Component
const Navigation = ({ activeSection, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navItems = ['Home', 'Education', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact']

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-content">
        <motion.a 
          href="#home" 
          className="nav-logo-badge"
          whileHover={{ scale: 1.05 }}
        >
          <span className="nav-badge-dot"></span>
          <span className="nav-badge-text">Open to Work</span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="nav-right">
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`}
                  className={activeSection === item.toLowerCase() ? 'active' : ''}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="nav-icons">
            <a href="https://github.com/dakidinesh" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/dineshdaki/" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-nav-right">
          <a href="https://github.com/dineshdaki" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/dineshdaki/" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <ul className="mobile-nav-links">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className={activeSection === item.toLowerCase() ? 'active' : ''}
                    onClick={handleLinkClick}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Roaming Mascot Component
const RoamingMascot = () => {
  const [positionX, setPositionX] = useState(50)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [isTickled, setIsTickled] = useState(false)
  const [currentExpression, setCurrentExpression] = useState('')
  const [showExpression, setShowExpression] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lastSection, setLastSection] = useState('')

  const expressions = [
    "Hello! 👋",
    "Nice code! 💻",
    "Hire me! 😊",
    "Let's build! 🚀",
    "Coffee? ☕",
    "Bug free! 🐛",
    "Git push! 📤",
    "Woohoo! 🎉",
    "React! ⚛️",
    "Coding... 🤓",
    "Hi there! 👀",
    "Yo! ✌️",
    "💃 Dancing!",
    "🕺 Groove!",
    "🎵 La la la~",
    "🎶 Vibing!",
    "✨ Sparkle!",
    "🔥 On fire!",
    "AWS certified! ☁️",
    "Full stack! 🥞",
    "npm install 📦",
    "No bugs here! ✅",
    "Ship it! 🚢",
    "Debugging... 🔍",
    "Stack overflow! 📚",
    "Merge conflict! 😅",
    "Clean code! ✨",
    "Agile! 🏃",
    "API ready! 🔌",
    "TypeScript! 💙",
    "Python! 🐍",
    "Data driven! 📊",
    "Cloud native! ☁️",
    "DevOps! 🔧",
    "ETL magic! ✨",
    "Query time! 🗄️",
    "*happy beeps* 🤖",
    "Boop! 👆",
    "Pew pew! 🔫",
    "Zoom zoom! 💨",
    "Wheee! 🎢",
    "Yay! 🥳",
    "So cool! 😎",
    "Love this! 💕",
    "Amazing! 🤩",
    "*wink* 😉",
    "Click me! 👆",
  ]

  const tickleExpressions = [
    "Hehe! 😆",
    "Stop it! 🤭",
    "Tehehe! 😝",
    "Tickles! 🤣",
    "Wahaha! 😂",
    "Nooo! 🙈",
    "Again?! 😜",
    "Too much! 🤪",
    "Stahp! 😹",
    "Eeek! 🙊",
  ]

  const sectionMessages = {
    home: ["Welcome! 🏠", "Nice to meet you!", "Hey there! 👋", "Glad you're here! 😊", "Let's explore! 🗺️"],
    skills: ["I know these! 🎯", "Cool tech stack! 💻", "Skills unlocked! 🔓", "So many skills! 🤯", "Full stack ready! 🥞"],
    experience: ["Work history! 💼", "Experienced dev! 👨‍💻", "Career journey! 🚀", "Real world exp! 💪", "Growing fast! 📈"],
    education: ["Smart cookie! 🎓", "Knowledge! 📚", "Learning never stops!", "Always learning! 🧠", "MS in CS! 🎉"],
    certifications: ["AWS certified! ☁️", "Badge collector! 🏅", "Certified pro! ✅", "Cloud ready! 🌩️"],
    projects: ["Check these out! 👀", "Built with ❤️", "Cool projects! 🛠️", "Shipped it! 🚢", "Real impact! 💥"],
    contact: ["Let's connect! 📧", "Hire me! 🤝", "Say hello! 💬", "Drop a message! 📝", "Let's talk! 🗣️"]
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

  // Track scroll progress and current section
  useEffect(() => {
    let lastProgress = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.round((scrollTop / docHeight) * 100)
      setScrollProgress(progress)

      // Check scroll milestones
      scrollMessages.forEach(({ at, msg }) => {
        if (lastProgress < at && progress >= at) {
          setCurrentExpression(msg)
          setShowExpression(true)
          setTimeout(() => setShowExpression(false), 3000)
        }
      })
      lastProgress = progress

      // Detect current section
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

  // Random expressions while roaming
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
    // Mascot walks along the bottom edge of the screen only
    const moveInterval = setInterval(() => {
      if (isTickled) return // Don't move while being tickled
      
      setPositionX(prev => {
        // Random movement along X axis
        const moveAmount = (Math.random() * 200) + 100
        const moveDirection = Math.random() > 0.5 ? 1 : -1
        let newX = prev + (moveAmount * moveDirection)
        
        // Keep within horizontal bounds
        const maxX = window.innerWidth - 100
        if (newX < 50) {
          newX = 50
          setDirection(1)
        } else if (newX > maxX) {
          newX = maxX
          setDirection(-1)
        } else {
          setDirection(moveDirection)
        }
        
        return newX
      })
    }, 3000)

    return () => clearInterval(moveInterval)
  }, [isTickled])

  return (
    <motion.div
      className="roaming-mascot"
      animate={{ 
        x: positionX
      }}
      transition={{ 
        type: "spring", 
        stiffness: 50, 
        damping: 20,
        duration: 2 
      }}
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
        transition={isTickled ? {
          duration: 0.6,
          ease: "easeInOut"
        } : {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Speech bubble */}
        {showExpression && (
          <>
            {isTickled && (
              <>
                <motion.span 
                  className="tickle-sparkle"
                  initial={{ opacity: 0, scale: 0, x: -20, y: -20 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: -30, y: -40 }}
                  transition={{ duration: 0.5 }}
                >✨</motion.span>
                <motion.span 
                  className="tickle-sparkle"
                  initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: 30, y: -35 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >⭐</motion.span>
              </>
            )}
            <motion.div 
              className="mascot-speech"
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
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
                  <motion.span 
                    className="eye-roam"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <motion.span 
                    className="eye-roam"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
                  />
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
          animate={isTickled ? {
            rotate: [-20, 20, -20, 20, -20]
          } : {
            rotate: [-12, 12, -12],
            y: [0, -2, 0]
          }}
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

// Floating Numbers Component
const FloatingNumbers = () => {
  const numbers = ['0', '1', '01', '10', '{}', '</>', '()', '[]', '/*', '*/', '&&', '||', '++', '--', '=>', '::']
  const items = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    char: numbers[Math.floor(Math.random() * numbers.length)],
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    size: 10 + Math.random() * 14
  }))

  return (
    <div className="floating-numbers">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-number"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  )
}

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="floating-particles">
      {particles.map((i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  )
}

// Time-based greeting helper
const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Good morning ☀️"
  if (hour >= 12 && hour < 17) return "Good afternoon 🌤️"
  if (hour >= 17 && hour < 21) return "Good evening 🌅"
  return "Hey, night owl 🌙"
}

// Visitor Counter Hook
const useVisitorCount = () => {
  const [count, setCount] = useState(null)
  
  useEffect(() => {
    // Using CountAPI for real visitor counting
    const namespace = 'dinesh-daki-portfolio'
    const key = 'visits'
    
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(() => {
        // Fallback to localStorage if API fails
        const stored = localStorage.getItem('visitorCount') || '1000'
        const newCount = parseInt(stored) + 1
        localStorage.setItem('visitorCount', newCount.toString())
        setCount(newCount)
      })
  }, [])
  
  return count
}

// Hero Section (Combined with About)
const Hero = () => {
  const greeting = getTimeGreeting()
  const visitorCount = useVisitorCount()

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <FloatingParticles />
        <FloatingNumbers />
        <div className="anime-grid"></div>
      </div>
      
      {/* Visitor Counter */}
      {visitorCount && (
        <motion.div 
          className="visitor-counter"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="visitor-icon">🎉</span>
          <span>You're visitor <strong>#{visitorCount.toLocaleString()}</strong>!</span>
        </motion.div>
      )}

      {/* Hero Top Section */}
      <div className="hero-content">
        <motion.div 
          className="time-greeting"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="greeting-text">{greeting}</span>
        </motion.div>
        <motion.p 
          className="hero-greeting"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm
        </motion.p>
        <motion.h1 
          className="hero-name"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dinesh Daki
        </motion.h1>
        <motion.div 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="title-accent">Software</span> Engineer
        </motion.div>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Software Engineer with experience designing scalable backend systems and AI-enabled applications. Strong foundation in data structures, algorithms, object-oriented programming, distributed systems, and cloud computing, with experience using Python, JavaScript, and TypeScript to build high-performance systems.
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="/resume.pdf" download className="btn btn-primary">Download Resume</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </motion.div>

        </div>
    </section>
  )
}

// Education Section
const Education = () => {
  const education = [
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      school: 'California State University, Fullerton',
      location: 'Fullerton, California',
      period: 'Jan 2023 - Dec 2025',
      gpa: '3.8 / 4.0',
      logo: csufLogo,
      highlights: [
        'Focus on Data Science, Machine Learning, and Software Engineering',
        'Relevant Coursework: Advanced Algorithms, Database Systems, Machine Learning, Cloud Computing'
      ]
    },
    {
      id: 2,
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      school: 'GITAM University',
      location: 'Hyderabad, Telangana',
      period: 'Aug 2018 - May 2022',
      gpa: '8.93 / 10.0',
      logo: gitamLogo,
      highlights: [
        'Strong foundation in Data Structures, Algorithms, and Software Development',
        'Relevant Coursework: Object-Oriented Programming, Database Management, Web Technologies'
      ]
    }
  ]

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Academic Background</span>
          <h2>Education</h2>
        </motion.div>
        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div 
              key={edu.id}
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="education-logo">
                <img src={edu.logo} alt={`${edu.school} logo`} />
              </div>
              <div className="education-content">
                <div className="education-header">
                  <h3>{edu.degree}</h3>
                  <span className="education-gpa">GPA: {edu.gpa}</span>
                </div>
                <div className="education-school">{edu.school}</div>
                <div className="education-meta">
                  <span className="education-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {edu.location}
                  </span>
                  <span className="education-period">{edu.period}</span>
                </div>
                <ul className="education-highlights">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section
const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Software Engineer Intern',
      company: 'ReplyQuickAI',
      location: 'Los Angeles, California',
      period: 'Sep 2025 - Dec 2025',
      type: 'Internship',
      logo: replyquickLogo,
      highlights: [
        'Designed and implemented scalable microservices-based backend systems using object-oriented design, Node.js, TypeScript, RESTful APIs, and Twilio to support real-time communication workflows',
        'Architected a high-throughput SMS and voice campaign platform supporting 100K+ messages and calls per campaign, ensuring reliability and horizontal scalability',
        'Built a real-time observability and monitoring dashboard for AI agents and optimized PostgreSQL queries using Prisma, improving data retrieval performance by 40%',
        'Reduced API latency by 35% by optimizing database queries, implementing asynchronous processing, and introducing server-side caching, improving overall system throughput and reliability',
        'Applied efficient data structures and algorithms (hash maps, queues) to optimize backend request handling'
      ]
    },
    {
      id: 2,
      role: 'Student Assistant - Data Engineering & Analytics',
      company: 'California State University Fullerton',
      location: 'Fullerton, California',
      period: 'Aug 2024 - Dec 2025',
      type: 'Part-time',
      logo: csufLogo,
      highlights: [
        'Designed automated ETL pipelines using Python + SQL, streamlining data ingestion for academic reporting',
        'Built internal analytics tools (Streamlit dashboards, Excel reports) — reduced manual reporting effort by ~60%',
        'Performed data cleaning, validation and transformation, improving accuracy for quarterly academic dashboards',
        'Delivered insights through data visualizations, influencing decisions on course offerings and student success metrics'
      ]
    },
    {
      id: 3,
      role: 'Software Engineer',
      company: 'OSR Solutions',
      location: 'Hyderabad, Telangana',
      period: 'Jan 2023 - Dec 2023',
      type: 'Full-time',
      icon: '📊',
      highlights: [
        'Designed and developed full-stack data-driven workflows using backend services, REST APIs, and frontend components, reducing insight delivery time from days to hours',
        'Designed scalable ETL pipelines on AWS with MySQL, improving data ingestion throughput by 25%',
        'Performed data validation, anomaly detection, and data quality checks using SQL and Excel, reducing reporting discrepancies by 30%'
      ]
    },
    {
      id: 4,
      role: 'Data Science Intern',
      company: 'Phoenix Global',
      location: 'Hyderabad, Telangana',
      period: 'May 2022 - Jul 2022',
      type: 'Internship',
      logo: phoenixLogo,
      highlights: [
        'Implemented scalable ETL data ingestion pipelines to consolidate data from multiple sources including REST APIs, CSV files, and relational databases into AWS S3 data lake, establishing a centralized data repository',
        'Developed automated data validation and normalization scripts using Python to enforce schema consistency and data integrity, ensuring high-quality datasets for downstream analytics and machine learning workflows',
        'Optimized batch data processing workflows using Apache Spark on large-scale datasets, reducing execution runtime by 20% through query optimization, partitioning strategies, and efficient resource allocation',
        'Supported big data architecture design and implementation with Hadoop, Spark, and serverless AWS components, contributing to the development of a modern data infrastructure platform'
      ]
    }
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Career Path</span>
          <h2>Experience</h2>
        </motion.div>
        <div className="experience-timeline">
          <div className="timeline-line"></div>
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-dot">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="timeline-logo" />
                ) : (
                  <span>{exp.icon}</span>
                )}
              </div>
              <motion.div 
                className="experience-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header">
                  <div className="experience-row">
                    <h3>{exp.role}</h3>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <div className="experience-row">
                    <div className="experience-company-info">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-type">{exp.type}</span>
                    </div>
                    <span className="experience-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>
                <ul className="experience-highlights">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills Section
const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming & Analytics',
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
        { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
        { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
        { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      ]
    },
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
        { name: 'Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
        { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      ]
    },
    {
      title: 'Data Processing & BI',
      skills: [
        { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
        { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
        { name: 'Apache Spark', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg' },
        { name: 'Hadoop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg' },
        { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' },
      ]
    },
    {
      title: 'Databases & Cloud',
      skills: [
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'DynamoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dynamodb/dynamodb-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      ]
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Technical Stack</span>
          <h2>Skills</h2>
        </motion.div>
        
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className="skill-category-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.15 + 0.2 }}
              >
                {category.title}
              </motion.h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    className="skill-chip"
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 150
                    }}
                    whileHover={{ 
                      scale: 1.08,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="skill-chip-icon"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Certifications Section
const Certifications = () => {
  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Developer - Associate',
      code: 'DVA-C02',
      issuer: 'Amazon Web Services',
      issued: 'May 2025',
      expires: 'May 2028',
      credentialId: 'e0b944b16fdb42b1865501a72e57d722',
      icon: '🏆',
      color: '#FF9900',
      skills: ['AWS Lambda', 'DynamoDB', 'CloudFormation', 'CodePipeline', 'CI/CD']
    },
    {
      id: 2,
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      issuer: 'Amazon Web Services',
      issued: 'Feb 2025',
      expires: 'May 2028',
      credentialId: 'af8a4f81c70b4e3fadcde3e4df9bd5a6',
      icon: '☁️',
      color: '#FF9900',
      skills: ['Cloud Computing', 'Cloud Security', 'Solutions Architecture']
    },
    {
      id: 3,
      name: 'Introduction to Big Data with Spark and Hadoop',
      code: '',
      issuer: 'IBM',
      issued: 'Jan 2023',
      expires: '',
      credentialId: '6TYJSGC5E9TX',
      icon: '📊',
      color: '#0530AD',
      skills: ['Apache Spark', 'Hadoop', 'PySpark', 'Kubernetes', 'Docker']
    },
    {
      id: 4,
      name: 'Introduction to Data Engineering',
      code: '',
      issuer: 'IBM',
      issued: 'Oct 2022',
      expires: '',
      credentialId: 'XAAZA62YJRKA',
      icon: '⚙️',
      color: '#0530AD',
      skills: ['ETL', 'Data Pipelines', 'SQL', 'NoSQL', 'Data Lakes']
    },
    {
      id: 5,
      name: 'Python for Data Science, AI & Development',
      code: '',
      issuer: 'IBM',
      issued: 'Oct 2022',
      expires: '',
      credentialId: 'GXD24EVD2R62',
      icon: '🐍',
      color: '#0530AD',
      skills: ['Python', 'NumPy', 'Pandas', 'Data Analysis']
    }
  ]

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Credentials</span>
          <h2 className="section-title">Certifications</h2>
        </motion.div>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="certification-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="cert-header">
                <div className="cert-icon" style={{ background: `${cert.color}20`, borderColor: cert.color }}>
                  <span>{cert.icon}</span>
                </div>
                <div className="cert-issuer-badge" style={{ background: cert.color }}>
                  {cert.issuer === 'Amazon Web Services' ? 'AWS' : cert.issuer}
                </div>
              </div>
              
              <div className="cert-body">
                <h3 className="cert-name">{cert.name}</h3>
                {cert.code && <span className="cert-code">{cert.code}</span>}
                
                <div className="cert-meta">
                  <span className="cert-date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {cert.issued}
                  </span>
                  {cert.expires && (
                    <span className="cert-expires">Valid until {cert.expires}</span>
                  )}
                </div>
                
                <div className="cert-skills">
                  {cert.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="cert-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="cert-footer">
                <span className="cert-credential">ID: {cert.credentialId.substring(0, 12)}...</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: '✨ CaptionGen',
      description: 'AI-Powered Instagram Caption Generator — Transform your photos into viral, engagement-driving captions instantly. CaptionGen leverages Google\'s Gemini 2.0 Flash model to analyze images and generate contextually relevant, engaging Instagram captions. Whether you\'re a content creator, social media manager, or casual Instagram user, CaptionGen helps you craft the perfect caption in seconds.',
      tags: ['AI', 'Google Gemini', 'React', 'Python'],
      image: captionGenImage,
      github: 'https://github.com/dakidinesh/CaptionGen',
      live: 'https://dakidinesh.github.io/CaptionGen/'
    },
    {
      id: 2,
      title: 'Emotion-Based Music Recommendation System',
      description: 'A real-time emotion detection and music recommendation system that uses facial expression recognition to suggest personalized music based on your current mood. The system captures video feed from your webcam, detects emotions using a deep learning model, and recommends songs accordingly using Spotify integration.',
      tags: ['Python', 'TensorFlow', 'Flask', 'OpenCV', 'Spotify API'],
      image: emotionMusicImage,
      github: 'https://github.com/dakidinesh/Emotion-Music-Recommendation-System',
      live: '#'
    },
    {
      id: 3,
      title: 'Personal Website',
      description: 'A modern, responsive portfolio website built with React and Framer Motion. Features smooth animations, dark/light theme toggle, and interactive UI elements. Built with Vite for fast development and optimized production builds, deployed on GitHub Pages with automated CI/CD workflows.',
      tags: ['React', 'JavaScript', 'Framer Motion', 'CSS', 'Vite'],
      image: portfolioProjectImage,
      github: 'https://github.com/dakidinesh/portfolio',
      live: 'https://dakidinesh.github.io/portfolio/'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">My Work</span>
          <h2>Featured Projects</h2>
        </motion.div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                {typeof project.image === 'string' && project.image.length <= 3 ? (
                  <span className="project-emoji">{project.image}</span>
                ) : (
                  <img src={project.image} alt={project.title} className="project-img" />
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    // Initialize EmailJS - Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    // You can get this from https://dashboard.emailjs.com/admin/integration
    emailjs.init('YOUR_PUBLIC_KEY')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      // Send email notification
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'dakidinesh0711@gmail.com',
        to_name: 'Dinesh Daki'
      }

      // Replace with your EmailJS service ID and template ID
      const emailServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const emailTemplateId = process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID || 'YOUR_EMAIL_TEMPLATE_ID'

      await emailjs.send(emailServiceId, emailTemplateId, emailParams)

      // Send SMS notification via Verizon email-to-SMS gateway
      const phoneNumber = '6576317082' // Your 10-digit number without +1
      const smsEmailParams = {
        to_email: `${phoneNumber}@vtext.com`, // Verizon SMS gateway
        subject: 'New Contact Form Submission',
        message: `New contact from ${formData.name} (${formData.email}): ${formData.message}`,
        from_name: 'Portfolio Contact Form'
      }

      try {
        // Use the same email service but send to Verizon SMS gateway
        await emailjs.send(emailServiceId, emailTemplateId, smsEmailParams)
      } catch (smsError) {
        console.log('SMS notification failed (optional):', smsError)
        // SMS is optional, so we don't fail the whole submission
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thanks for reaching out! I\'ll get back to you soon.' 
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or email me directly.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2>Contact Me</h2>
        </motion.div>
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Let's connect!</h3>
            <p>Open to full-time opportunities in Data Analytics, Data Science, and Software Engineering. Feel free to reach out!</p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
      <div>
                  <h4>Email</h4>
                  <a href="mailto:dakidinesh0711@gmail.com">dakidinesh0711@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Los Angeles, CA (Open to Relocate)</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
      <div>
                  <h4>Phone</h4>
                  <a href="tel:+16576317082">(657) 631-7082</a>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/dakidinesh" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/dineshdaki/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:dakidinesh0711@gmail.com" className="social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
        </a>
      </div>
          </motion.div>
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
      </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            {submitStatus.message && (
              <motion.div
                className={`submit-status ${submitStatus.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitStatus.message}
              </motion.div>
            )}
            <motion.button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// Footer
// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
          <span className="back-to-top-text">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Dinesh Daki. All rights reserved.</p>
        <p className="footer-tagline">Built with React & ☕</p>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) return saved
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'education', 'experience', 'skills', 'projects', 'certifications', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div 
          className="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RoamingMascot />
          <Navigation activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <Education />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </>
  )
}

export default App
