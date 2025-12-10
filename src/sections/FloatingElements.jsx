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
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 6}s`
          }}
        />
      ))}
    </div>
  )
}

const FloatingElements = () => {
  return (
    <>
      <FloatingParticles />
      <FloatingNumbers />
    </>
  )
}

export default FloatingElements



