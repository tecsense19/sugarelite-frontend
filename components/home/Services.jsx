import Image from "next/image"
import Img1 from "../../public/assets/hug.svg"
import Img2 from "../../public/assets/online-dating.svg"
import Img3 from "../../public/assets/champagne.svg"
import Img4 from "../../public/assets/date.svg"
import Img5 from "../../public/assets/search (1).svg"
import Img6 from "../../public/assets/profile.svg"

const Services = () => {
  const servicesArr = [
    { id: 1, imgUrl: Img1, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." },
    { id: 2, imgUrl: Img2, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." },
    { id: 3, imgUrl: Img3, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." },
    { id: 4, imgUrl: Img4, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." },
    { id: 5, imgUrl: Img5, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." },
    { id: 6, imgUrl: Img6, title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum." }
  ]
  return (
    <div className="w-full flex justify-center">
      <div className="mt-[150px] w-8/12 grid gap-y-[25px] gap-x-[30px] columns-2 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {servicesArr?.map((item, idx) => {
          return (
            <div key={idx} className="bg-primary-dark-2 rounded-[5px] p-8" data-aos="flip-right" data-aos-offset="100" data-aos-duration="500">
              <div className="relative group flex items-center left-[34px]">
                <div className="bg-secondary rounded-full h-[63px] w-[63px]"></div>
                <Image src={item.imgUrl} alt="" height={45} width={45} priority className="absolute -translate-x-[22px]" />
              </div>
              <div className="mt-[28px] text-[20px] font-[500] tracking-[-0.2px]" style={{ lineHeight: "normal" }}>{item.title}</div>
              <div className="mt-1 text-[16px] font-[300]" style={{ lineHeight: "28px" }}>{item.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Services