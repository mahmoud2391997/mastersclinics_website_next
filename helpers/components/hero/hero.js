import getImageUrl from "@/utilies/getImageUrl"



const Hero = ({
  tagline = "ماسترز خبراء لجمالك وصحتك",
  heading = "اهتمي ببشرتك... مع أفضل أطباء الجلدية والتجميل في عيادات ماسترز",
  description = "جلسات نضارة، علاج لحب الشباب، تساقط الشعر، تقشير، بوتوكس، فيلر، ليزر، وكل ما يخص العناية بجمالك",
  heroImageSrc = "https://medically-react.wpolive.com/static/media/1.f83d52cba0c04965b7cd.png",
}) => {
  return (
    <section className="relative z-[111] flex flex-col lg:flex-row-reverse items-center justify-between overflow-hidden sm:min-h-[100vh] bg-[#f6eecd]">
      {/* Mobile-only background shape - removed since we're changing layout */}
      
      {/* Container for side-by-side mobile layout */}
      <div className="w-full flex flex-row-reverse items-center justify-between px-4 lg:px-0">
        {/* Text Content - adjusted for mobile */}
        <div className="w-full md:w-1/2 max-w-1/2 flex justify-center items-center flex-col px-2 md:px-5 text-right lg:mr-[140px] mt-5 md:mt-0">
          <div className="w-full justify-center items-center flex flex-col gap-3 md:gap-5">
           
            <h2 className="inline-block text-[10px] md:text-[18px] lg:text-[20px] text-white bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83] px-3 py-1 rounded-[20px] mb-2 md:mb-4 text-center">
              {tagline}
            </h2>
          </div>
          <h3 className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[60px] xl:text-[80px] text-center font-normal leading-tight mb-3 md:mb-[20px]">
            {heading}
          </h3>
          <p className="text-[#767676] text-center text-[10px] sm:text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto md:mx-0 mb-6 md:mb-8">
            {description}
          </p>
        </div>

        {/* Image - adjusted for mobile */}
        <div className="w-full md:w-1/2 max-w-[400px] md:max-w-[753px] mx-auto lg:mr-[90px] mb-3 md:mt-0">
          {/* Curved container for the image */}
          <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-transparent  p-2 md:p-4 shadow-xl md:shadow-2xl">
            <div className="relative overflow-hidden rounded-[30px] md:rounded-[50px]">
              <img
                src={getImageUrl(heroImageSrc) || "/placeholder.svg"}
                alt="hero"
                className="w-full h-auto object-cover rounded-[25px] md:rounded-[45px]"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Background decorative circle - positioned behind */}
          <div className="absolute top-[19%] left-1/2 transform -translate-x-1/2 z-[-2] max-h-[400px] md:max-h-[750px] opacity-30 overflow-hidden">
            <svg width="753" height="752" viewBox="0 0 753 752" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M752.493 376.457C752.493 583.864 584.041 752 376.246 752C168.451 752 0 583.864 0 376.457C0 320.2 13.7995 254.174 36.0092 206.267C56.3111 162.475 130.104 224.738 185.662 172.123C241.22 119.508 178.685 48.8698 225.044 31.1796C266.762 15.2607 328.923 0.914062 376.246 0.914062C584.041 0.914062 752.493 169.05 752.493 376.457Z"
                fill="#dec06a"
              />
              <path
                d="M733.5 376.5C733.5 573.665 573.442 733.5 376 733.5C178.558 733.5 18.5 573.665 18.5 376.5C18.5 322.991 27.6243 264.215 48.7166 218.697C51.0955 213.563 54.1807 210.136 57.8619 207.92C61.5487 205.701 65.871 204.676 70.7577 204.412C75.6475 204.148 81.0767 204.646 86.9618 205.456C90.1016 205.888 93.3383 206.402 96.685 206.935C99.6404 207.405 102.682 207.889 105.817 208.341C119.122 210.26 133.779 211.552 148.932 208.464C164.098 205.373 179.735 197.9 195.015 182.334C225.587 151.188 225.672 120.173 223.667 94.9292C223.479 92.5581 223.273 90.2419 223.072 87.9839C222.201 78.1962 221.427 69.5026 222.622 62.182C223.354 57.6976 224.822 53.7636 227.444 50.4366C230.064 47.1107 233.862 44.358 239.309 42.2786C278.933 27.1513 331.016 19.5 376 19.5C573.442 19.5 733.5 179.335 733.5 376.5Z"
                stroke="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero