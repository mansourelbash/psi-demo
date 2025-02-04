import Image from "next/image"
import banner from  '@/assets/icons/banner.png'
const Banner = () => {
  return (
    <Image src={banner} alt="banner" />
  )
}
export default Banner