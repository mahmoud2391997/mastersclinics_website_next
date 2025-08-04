"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtafromSection from '../Form';

const Hero = ({
  tagline = "ماسترز خبراء لجمالك وصحتك",
  heading = "اهتمي ببشرتك... مع أفضل أطباء الجلدية والتجميل في عيادات ماسترز",
  description = "جلسات نضارة، علاج لحب الشباب، تساقط الشعر، تقشير، بوتوكس، فيلر، ليزر، وكل ما يخص العناية بجمالك",
  heroImageSrc = "https://medically-react.wpolive.com/static/media/1.f83d52cba0c04965b7cd.png",
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className='flex flex-col w-full  md:mt-0  items-center bg-gradient-to-b from-[#f6eecd] to-[#f9f3e0] overflow-hidden'>
      <motion.section 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-[111] flex flex-col md:flex-row-reverse items-center justify-between min-h-[80vh] md:min-h-[90vh] w-full max-w-7xl mx-auto px-4"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-[-2]">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-[#f0db83] opacity-10 blur-[50px] md:blur-[80px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-[#CBA853] opacity-10 blur-[60px] md:blur-[100px]"></div>
        </div>

        {/* Text Content */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-center md:items-end px-4 lg:px-8 xl:px-12 text-right py-8 md:mt-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-full flex flex-col items-center md:items-end mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="inline-block m-auto text-center md:text-right text-base md:text-lg text-white bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83] px-4 py-2 rounded-xl shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {tagline}
            </motion.h2>
          </motion.div>

          <motion.h3 
            className="text-[36px] font-normal leading-tight text-center md:text-right sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-6 text-[#2a2a2a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {heading}
          </motion.h3>

          <motion.p 
            className="text-[#555] text-center md:text-right text-base md:text-lg leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Image */}
        <motion.div 
          variants={imageVariants}
          className="relative w-full lg:w-1/2 max-w-[600px] mx-auto lg:mr-8 lg:mt-0 mt-6"
        >
          <div className="relative z-[1]">
            <motion.img
              src={heroImageSrc || "/placeholder.svg"}
              alt="hero"
              className="w-full md:mt-35 h-auto object-contain drop-shadow-xl"
              style={{ maxHeight: "60vh" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-[-1] w-[80%] max-w-[500px]"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 753 752" fill="none" className="w-full h-auto">
                <path
                  d="M752.493 376.457C752.493 583.864 584.041 752 376.246 752C168.451 752 0 583.864 0 376.457C0 320.2 13.7995 254.174 36.0092 206.267C56.3111 162.475 130.104 224.738 185.662 172.123C241.22 119.508 178.685 48.8698 225.044 31.1796C266.762 15.2607 328.923 0.914062 376.246 0.914062C584.041 0.914062 752.493 169.05 752.493 376.457Z"
                  fill="#dec06a"
                  fillOpacity="0.2"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
      
      {/* <CtafromSection /> */}
    </div>
  )
}

export default Hero;