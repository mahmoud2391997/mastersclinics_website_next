import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative z-[111] hero_section flex flex-col md:flex-row-reverse items-center justify-between overflow-hidden min-h-[100vh] bg-gradient-to-b from-[#f6eecd] to-[#f9f3e0]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-[-2]">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#f0db83] opacity-10 blur-[80px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#CBA853] opacity-10 blur-[100px]"></div>
      </div>

      {/* Mobile-only background shape */}
      <div className="absolute inset-0 z-[-1] lg:hidden">
        <svg viewBox="0 0 1920 1075" fill="none" className="w-full h-full">
          <path d="M0 0H1920V1000C1920 1000 1632 619 962 917C292 1215 0 1000 0 1000V0Z" fill="#f6eecd" />
        </svg>
      </div>

      {/* Text Content - Right Side */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex content justify-center items-center flex-col px-5 lg:px-12 xl:px-20 text-right lg:mr-[50px] mt-10 lg:mt-0"
      >
        {/* Logo & Tagline Container */}
        <motion.div 
          className="w-full flex flex-col items-center md:items-end gap-5 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2 
            className="inline-block text-[20px]  sm:text-[22px] lg:text-[24px] text-[16px] sm:text-[18px] lg:text-[20px] text-white bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]  px-6 py-3 rounded-[24px] mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {tagline}
          </motion.h2>
        </motion.div>

        {/* Main Heading - Larger Text */}
        <motion.h3 
          className="text-[42px] sm:text-[50px] md:text-[55px]  xl:text-[90px] 2xl:text-[110px] font-normal leading-[1.1] mb-8 text-[#2a2a2a] md:text-right  w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {heading}
        </motion.h3>

        {/* Description - Larger Text */}
        <motion.p 
          className="text-[#555] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[1.8] mb-12 text-right w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons - Larger */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center md:justify-end w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="bg-gradient-to-br from-[#A58532] to-[#CBA853] theme-btn text-white   rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(165, 133, 50, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            احجز موعدك الآن
          </motion.button>
          

        </motion.div>
      </motion.div>

      {/* Image with animation - Left Side */}
      <motion.div 
        variants={imageVariants}
        className="relative w-full lg:w-1/2 max-w-[753px] mx-auto lg:mr-[50px] lg:mt-0 mt-10"
      >
        <div className="relative z-[1]">
          <motion.img
            src={heroImageSrc || "/placeholder.svg"}
            alt="hero"
            className="w-full h-auto object-contain drop-shadow-2xl"
            style={{ width: "753px", height: "928px", objectFit: "cover" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-[19%] left-1/2 transform -translate-x-1/2 z-[-1] max-h-[750px]"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="753" height="752" viewBox="0 0 753 752" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M752.493 376.457C752.493 583.864 584.041 752 376.246 752C168.451 752 0 583.864 0 376.457C0 320.2 13.7995 254.174 36.0092 206.267C56.3111 162.475 130.104 224.738 185.662 172.123C241.22 119.508 178.685 48.8698 225.044 31.1796C266.762 15.2607 328.923 0.914062 376.246 0.914062C584.041 0.914062 752.493 169.05 752.493 376.457Z"
                fill="#dec06a"
                fillOpacity="0.2"
              />
              <path
                d="M733.5 376.5C733.5 573.665 573.442 733.5 376 733.5C178.558 733.5 18.5 573.665 18.5 376.5C18.5 322.991 27.6243 264.215 48.7166 218.697C51.0955 213.563 54.1807 210.136 57.8619 207.92C61.5487 205.701 65.871 204.676 70.7577 204.412C75.6475 204.148 81.0767 204.646 86.9618 205.456C90.1016 205.888 93.3383 206.402 96.685 206.935C99.6404 207.405 102.682 207.889 105.817 208.341C119.122 210.26 133.779 211.552 148.932 208.464C164.098 205.373 179.735 197.9 195.015 182.334C225.587 151.188 225.672 120.173 223.667 94.9292C223.479 92.5581 223.273 90.2419 223.072 87.9839C222.201 78.1962 221.427 69.5026 222.622 62.182C223.354 57.6976 224.822 53.7636 227.444 50.4366C230.064 47.1107 233.862 44.358 239.309 42.2786C278.933 27.1513 331.016 19.5 376 19.5C573.442 19.5 733.5 179.335 733.5 376.5Z"
                stroke="white"
                strokeOpacity="0.3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Floating video button */}
      
      </motion.div>
    </motion.section>
  )
}

export default Hero;