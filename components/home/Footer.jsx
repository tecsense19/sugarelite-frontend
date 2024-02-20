import Image from "next/image";
import logo from "../../public/assets/logo_home_footer.svg";
import facebookImg from "../../public/assets/facebook_footer_img.svg";
import facebookActiveImg from "../../public/assets/facebook_footer_active_img.svg";
import instagramImg from "../../public/assets/instagram_footer_img.svg";
import instagramActiveImg from "../../public/assets/instagram_footer_active_img.svg";
import linkdinImg from "../../public/assets/linkdin_footer_img.svg";
import linkdinActiveImg from "../../public/assets/linkdin_footer_active_img.svg";
import twitterImg from "../../public/assets/twitter_footer_img.svg";
import twitterActiveImg from "../../public/assets/twitter_footer_active_img.svg";
import correctIcon from "../../public/assets/correct_icon.svg";
import sendIcon from "../../public/assets/send_icon.svg";
import { Collapse, ConfigProvider } from 'antd';

const Footer = () => {

  const socialButtons = [
    { image: facebookImg, activeImg: facebookActiveImg },
    { image: instagramImg, activeImg: instagramActiveImg },
    { image: linkdinImg, activeImg: linkdinActiveImg },
    { image: twitterImg, activeImg: twitterActiveImg }
  ]

  const footerMiddleContent = [
    { title: "Company", features: ["About", "Reviews", "Clients"] },
    { title: "Feature", features: ["Quick Access", "Secure Payment", "24/7 Support"] },
    { title: "Download", features: ["Android App", "IOS App", "Mobile Version"] }
  ]

  const getMobileMiddleContent = () => {
    let tempArr = [];
    footerMiddleContent.map((item, idx) => {
      tempArr.push({
        key: idx,
        style: { marginBottom: 12 },
        label: <div className={`text-[20px] font-medium md:text-[24px] md:font-extrabold leading-[30px] text-white ${((idx + 1) !== footerMiddleContent.length) ? "mb-3" : ""}`}>{item.title}</div>,
        children: <div className="mt-[5px] mb-5 2xl:mt-10 flex flex-col gap-y-3 2xl:gap-y-5">
          {item.features.map((name, index) => {
            return (
              <div key={`${item.title}_${index}`} className="flex items-center justify-start gap-x-3 2xl:gap-x-5">
                <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100" />
                <div className="text-[clamp(16px,2vw,17px)] font-normal leading-[normal] text-white/70 md:text-white">{name}</div>
              </div>
            )
          })}
        </div>
      })
    })
    return tempArr;
  }

  return (
    <div className="mt-[50px] md:mt-[120px] w-full flex justify-center items-center bg-black pb-[30px] home-footer-container" data-aos="fade-up">
      <div className="w-full px-4 sm:px-0 sm:w-8/12">
        <div className="w-full mt-[50px] 2xl:mt-[150px] grid grid-cols-1 2xl:grid-cols-12 gap-x-[55px]">
          <div className="2xl:col-span-3">
            <div>
              <Image src={logo} priority alt="" height={43} width={217} className="select-none pointer-events-none hidden 2xl:block" />
              <Image src={logo} priority alt="" height={35} width={177} className="select-none pointer-events-none 2xl:hidden" />
            </div>
            <div className="mt-4 2xl:mt-[25px] text-start text-[16px] font-normal leading-[28px]">
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-[11px]">
              {socialButtons.map((item, idx) => {
                return (
                  <button key={idx} className="group rounded-full">
                    <Image src={item.image} priority alt="" height={40} width={40} className="select-none pointer-events-none transition-scale duration-75 ease-linear scale-100 group-hover:scale-x-0 absolute" />
                    <Image src={item.activeImg} priority alt="" height={40} width={40} className="select-none pointer-events-none transition-scale duration-75 ease-linear scale-x-0 group-hover:scale-100" />
                  </button>
                )
              })}
            </div>
          </div>
          {/* Mobile Middle Content Start */}
          <div className="block md:hidden mt-9 text-[26px] font-semibold leading-[30px]">
            Information
          </div>
          <div className="grid md:hidden w-full mt-9 border-b-[1px] border-white/25">
            <ConfigProvider theme={{ components: { Collapse: { contentPadding: "0px", headerPadding: "0px 4px 0px 0px", colorBorder: "rgba(255,255,255,0.25)" } } }}>
              <Collapse items={getMobileMiddleContent()} bordered={false} defaultActiveKey={['1']} expandIconPosition="end" />
            </ConfigProvider>
          </div>
          {/* Mobile Middle Content End */}
          {/* Desktop Middle Content Start */}
          <div className="2xl:col-span-6 md:flex justify-between mt-10 2xl:mt-0 hidden">
            {footerMiddleContent.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className="text-[20px] font-medium md:text-[24px] md:font-extrabold leading-[30px]">{item.title}</div>
                  <div className="mt-5 2xl:mt-10 flex flex-col gap-y-3 2xl:gap-y-5">
                    {item.features.map((name, index) => {
                      return (
                        <div key={`${item.title}_${index}`} className="flex items-center justify-start gap-x-3 2xl:gap-x-5">
                          <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100" />
                          <div className="text-[clamp(16px,2vw,17px)] font-normal leading-[normal] text-white/70 md:text-white">{name}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Desktop Middle Content End */}
          <div className="2xl:col-span-3 mt-10 2xl:mt-0">
            <div className="text-[24px] font-extrabold leading-[30px]">News Letter</div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 2xl:mt-10 relative flex items-center">
              <input type="email" className="w-full bg-white rounded-[5px] h-12 ps-5 pe-14 outline-none border-0 text-primary text-[17px] font-normal leading-[normal]" placeholder="Enter your email" />
              <button type="submit" className="w-12 h-12 flex justify-center items-center rounded-[5px] absolute bg-secondary left-[calc(100%-48px)]">
                <Image src={sendIcon} alt="" width={20} height={20} className="select-none pointer-events-none" />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full mt-[50px] 2xl:mt-[80px] border-t-[1px] border-white/25 lg:border-white/50 flex flex-col-reverse lg:flex-row justify-center items-center text-white/75 lg:text-white">
          <div className="text-[14px] font-normal leading-[normal] mt-[15px] lg:mt-[18px]">Copyright © 2024 SugarElite All Rights Reserved.</div>
          <div className="text-[14px] font-normal leading-[normal] mt-[18px] ms-3 hidden lg:block">|  Terms of Use  |   Privacy Policy   |   Disclaimer</div>
          <div className="text-[14px] font-normal leading-[normal] mt-5 lg:hidden">Terms of Use  |   Privacy Policy   |   Disclaimer</div>
        </div>
      </div>
    </div>
  )
}

export default Footer