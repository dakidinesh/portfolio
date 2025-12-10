import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingElements from './FloatingElements'

const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { text: "Good morning! ☀️", sub: "Ready to build something amazing?" }
  if (hour >= 12 && hour < 17) return { text: "Good afternoon! 🌤️", sub: "Thanks for stopping by!" }
  if (hour >= 17 && hour < 21) return { text: "Good evening! 🌅", sub: "Nice to see you here!" }
  return { text: "Hey, night owl! 🌙", sub: "Working late? Me too!" }
}

const useVisitorCount = () => {
  const [count, setCount] = useState(null)
  
  useEffect(() => {
    const namespace = 'dinesh-daki-portfolio'
    const key = 'visits'
    
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(() => {
        const stored = localStorage.getItem('visitorCount') || '1000'
        const newCount = parseInt(stored) + 1
        localStorage.setItem('visitorCount', newCount.toString())
        setCount(newCount)
      })
  }, [])
  
  return count
}

const Hero = () => {
  const greeting = getTimeGreeting()
  const visitorCount = useVisitorCount()
  
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <FloatingElements />
        <div className="anime-grid"></div>
      </div>
      
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
      
      <div className="hero-content">
        <motion.div 
          className="time-greeting"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="greeting-text">{greeting.text}</span>
          <span className="greeting-sub">{greeting.sub}</span>
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
          <span className="title-accent">Data Analyst</span> & Software Engineer
        </motion.div>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Transforming complex data into actionable insights and building scalable software solutions. 
          Passionate about leveraging technology to solve real-world problems.
        </motion.p>

        <motion.div 
          className="hero-about-cards"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="hero-card">
            <span className="hero-card-icon">💼</span>
            <div>
              <h4>Experience</h4>
              <p>2+ Years in Tech</p>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">🎓</span>
            <div>
              <h4>Education</h4>
              <p>MS in CS @ CSUF</p>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">☁️</span>
            <div>
              <h4>AWS Certified</h4>
              <p>Developer & Cloud</p>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">📊</span>
            <div>
              <h4>Focus</h4>
              <p>Data & Analytics</p>
            </div>
          </div>
        </motion.div>

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

export default Hero



