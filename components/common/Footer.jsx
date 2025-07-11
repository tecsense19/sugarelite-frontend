"use client"

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
import { Alert, Collapse, ConfigProvider } from 'antd';
import { useForm } from "react-hook-form";
import { newsletter_action } from "@/app/lib/actions";
import Link from "next/link";
import { client_routes } from "@/app/lib/helpers";
import { useState } from "react";

const Footer = ({ allStrings }) => {
  const { register, handleSubmit, setValue, formState: { isValid } } = useForm()
  const [showNewsLetterAlert, setShowNewsLetterAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const socialButtons = [
    { image: facebookImg, activeImg: facebookActiveImg },
    { image: instagramImg, activeImg: instagramActiveImg },
    { image: linkdinImg, activeImg: linkdinActiveImg },
    { image: twitterImg, activeImg: twitterActiveImg }
  ]

  const footerMiddleContent = [
    // allStrings["string_happy_members"]
    // {
    //   title: allStrings["string_company"],
    //   features: [allStrings["string_about"], allStrings["string_reviews"], allStrings["string_clients"]]
    // },
    {
      title: allStrings["string_feature"],
      features: [allStrings["string_quick_access"], allStrings["string_secure_payment"], allStrings["string_24/7_support"]]
    },
    // {
    //   title: allStrings["string_download"],
    //   features: [allStrings["string_android_app"], allStrings["string_ios_app"], allStrings["string_mobile_version"]]
    // }
  ]

  const getMobileMiddleContent = () => {
    let tempArr = [];
    footerMiddleContent.map((item, idx) => {
      tempArr.push({
        key: idx,
        style: { marginBottom: 12 },
        label: <div className={`text-[20px] font-medium md:text-[24px] md:font-extrabold leading-[30px] text-white capitalize ${((idx + 1) !== footerMiddleContent.length) ? "mb-3" : ""}`}>{item.title}</div>,
        children: <div className="mt-[5px] mb-5 2xl:mt-10 flex flex-col gap-y-3 2xl:gap-y-5">
          {item.features.map((name, index) => {
            return (
              <div key={`${item.title}_${index}`} className="flex items-center justify-start gap-x-3 2xl:gap-x-5">
                <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" />
                <div className="text-[clamp(16px,2vw,17px)] font-normal leading-[normal] text-white/70 md:text-white">{name}</div>
              </div>
            )
          })}
        </div>
      })
    })
    return tempArr;
  }

  const handleNewLetterSubmit = async (data) => {
    const res = await newsletter_action(data.email)
    // console.log("res ::", res);
    if (res.success) {
      openAlert("success", res.message)
      setValue("email", "")
    } else {
      if (res.error) {
        openAlert("error", res.error)
      } else {
        openAlert("error", res.message)
      }
    }
  }

  const handleWrongEmail = () => {
    if (isValid === false) {
      openAlert("error", "Invalid Email !")
    }
  }

  const openAlert = (type, msg, duration = 3) => {
    setShowNewsLetterAlert(true)
    setAlertMessage(msg);
    setAlertType(type)
    setTimeout(() => {
      setShowNewsLetterAlert(false)
    }, duration * 1000);
  };

  return (
    <div className="w-full flex justify-center items-center bg-black pb-5 home-footer-container text-white" >
      <div className="w-full px-4 sm:px-0 sm:w-8/12">
        <div className="w-full mt-[50px]  grid grid-cols-1 xl:grid-cols-12 gap-x-[55px]">
          <div className="xl:col-span-3">
            <div>
              <Image src={logo} priority alt="" height={43} width={217} className="select-none pointer-events-none hidden 2xl:block" />
              <Image src={logo} priority alt="" height={35} width={177} className="select-none pointer-events-none 2xl:hidden" />
            </div>
            <div className="mt-4 2xl:mt-[25px] text-start text-[16px] font-normal leading-[28px]">
              {allStrings["string_footer_description"]}
            </div>
            <div className="text-start text-[16px] font-normal leading-[28px]">
                  {allStrings["string_footer_description_2"]}
            </div>
            <div className="mt-2 2xl:mt-[15px] text-start text-[16px] font-normal leading-[28px]">
                <Link href={`mailto:${allStrings["string_footer_description_3"]}`} className="hover:text-secondary">
                {allStrings["string_footer_description_3"]}
                </Link>
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
          {/* {/ Mobile Middle Content Start /} */}
          {/* <div className="block md:hidden mt-9 text-[26px] font-semibold leading-[30px]">
            {allStrings["string_information"]}
          </div>
          <div className="grid md:hidden w-full mt-9 border-b-[1px] border-white/25">
            <ConfigProvider theme={{ components: { Collapse: { contentPadding: "0px", headerPadding: "0px 4px 0px 0px", colorBorder: "rgba(255,255,255,0.25)" } } }}>
              <Collapse items={getMobileMiddleContent()} bordered={false} defaultActiveKey={['1']} expandIconPosition="end" />
            </ConfigProvider>
          </div> */}
          {/* {/ Mobile Middle Content End /} */}
          {/* {/ Desktop Middle Content Start /} */}
          {/* <div className="xl:col-span-4 md:flex justify-between xl:ms-10 xl:justify-start mt-10 xl:mt-0 hidden">
            {footerMiddleContent.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className="text-[20px] font-medium md:text-[24px] md:font-extrabold leading-[30px]">{item.title}</div>
                  <div className="mt-5 2xl:mt-10 flex flex-col gap-y-3 2xl:gap-y-5">
                    {item.features.map((name, index) => {
                      return (
                        <div key={`${item.title}_${index}`} className="flex items-center justify-start gap-x-3 2xl:gap-x-5 ">
                          <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" />
                          <div className="text-[clamp(16px,2vw,17px)] font-normal leading-[normal] text-white/70 md:text-white transition-all ease-linear duration-75">{name}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div> */}

      <div className="xl:col-span-3 md:flex justify-between xl:ms-10 xl:justify-start mt-10 xl:mt-0">
          <div>
              <div className="text-[26px] font-semibold leading-[30px]">
                  {allStrings["string_information"]}
              </div>
              <div className='mt-4 lg:mt-10'>
                {/* <Link href={client_routes.getintouch} className=""> */}
                    <div className='flex items-center gap-2 mt-1'>
                        {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                        <p>{allStrings["string_contact_us"]}</p>
                        {/* string_quick_access */}
                    </div>
                  {/* </Link> */}
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_membership_footer"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_community_guidelines_footer"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_general_terms_and_conditions_footer"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_statement_on_data_protection_footer"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_cookie_policy_footer"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_faq_footer"]}</p>
                  </div>
              </div>
          </div>
      </div>


      <div className="xl:col-span-3 md:flex justify-between xl:ms-10 xl:justify-start mt-10 xl:mt-0">
          <div>
              <div className="text-[26px] font-semibold leading-[30px]">
                  {allStrings["string_explore_more"]}
              </div>
              <div className='mt-4 lg:mt-10'>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_online_dating_and_tips"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_success_stories_from_members"]}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                      {/* <Image src={correctIcon} alt="" width={16} height={11} className="select-none pointer-events-none opacity-70 md:opacity-100 h-[11px] w-[16px]" /> */}
                      <p>{allStrings["string_guide_to_safe_dating"]}</p>
                  </div>
              </div>
          </div>
      </div>


          {/* {/ Desktop Middle Content End /} */}
          <div className="xl:col-span-3 mt-10 xl:mt-0">
            <div className="text-[24px] font-extrabold leading-[30px]">
              {allStrings["string_news_letter"]}
            </div>
            <form onSubmit={handleSubmit(handleNewLetterSubmit)} className="mt-5 2xl:mt-10 relative flex items-center news-letter" autoComplete="nope">
              <input type="email" className="w-full bg-white rounded-[5px] h-12 ps-5 pe-14 outline-none border-0 text-primary text-[17px] font-normal leading-[normal]" placeholder={allStrings["string_enter_your_email"]} autoComplete="off"
                {...register("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} />
              <button type="submit" className="w-12 h-12 flex justify-center items-center rounded-[5px] absolute bg-secondary left-[calc(100%-48px)] transition-all ease-linear duration-75 hover:scale-105" onClick={handleWrongEmail}>
                <Image src={sendIcon} alt="" width={20} height={20} className="select-none pointer-events-none" />
              </button>
            </form>
            {showNewsLetterAlert
              ? <Alert message={alertMessage} type={alertType} showIcon className="!mt-4 !bg-primary !text-white !border-0 !rounded-[5px]" />
              : <></>
            }
          </div>
        </div>

        <div className="w-full mt-[50px] 2xl:mt-[80px] border-t-[1px] border-white/25 lg:border-white/50 flex flex-col-reverse  justify-center items-center text-white/75 lg:text-white">
          <div className="text-[14px] font-normal text-center leading-[normal] mt-[15px] lg:mt-[18px]">{allStrings["string_copyright_©_2024_sugarelite_all_rights_reserved"]}</div>
          {/* <div className="text-[14px] font-normal leading-[normal] mt-[18px] ms-3 hidden lg:block">
            |  <Link href={client_routes.termsOfUse} className="hover:text-secondary">{allStrings["string_terms_of_use"]}</Link>  |
            <Link href={client_routes.privacyPolicy} className="hover:text-secondary">{allStrings["string_privacy_policy"]}</Link>
            |   <Link href={client_routes.disclaimer} className="hover:text-secondary">{allStrings["string_disclaimer"]}</Link>
          </div> */}
          {/* <div className="text-[14px] font-normal leading-[normal] mt-5  flex gap-x-2">
            <Link href={client_routes.termsOfUse} className="hover:text-secondary">{allStrings["string_terms_of_use"]}</Link>
            <p >|</p>
            <Link href={client_routes.privacyPolicy} className="hover:text-secondary">{allStrings["string_privacy_policy"]}</Link>
             <p>|</p>
            <Link href={client_routes.disclaimer} className="hover:text-secondary">{allStrings["string_disclaimer"]}</Link>
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default Footer