"use client"

import Loader from "@/components/common/Loader"
import { Suspense } from "react"

const PrivacyPolicy = () => {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
          <div className="p-4 py-6 flex flex-col text-white w-full max-w-[770px]">
            <div className="relative flex justify-center items-center">
              {/* <Link className="absolute left-0" href={client_routes.home}>
                <Image src={leftArrow} alt="" height={26} width={26} className="pointer-events-none" />
              </Link> */}
              <div className="flex flex-col items-center">
                <div className="text-[16px] font-semibold text-secondary uppercase">Privacy Policy</div>
                <div className="font-semibold text-[26px] text-center md:text-[32px]">EliteSugar's Privacy Policy</div>
              </div>
            </div>
            <div className="my-5">
              <div>
                <div className="font-bold text-[18px] mb-1 text-white">Introduction</div>
                <div className="font-medium text-[16px] text-white/70">
                  When you visit our website, information is collected about you, which is used to customize and improve our content displayed on the site. If you do not want information to be collected, you should delete your cookies (see instructions) and refrain from further use of the website. Below we have elaborated on which information is collected, its purpose and which third parties have access to it.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Personal information</div>
                <div className="font-medium text-[16px] text-white/70">
                  Personal information is all kinds of information that can be attributed to you to one extent or another. When you use our website, we collect and process a number of such information. This happens e.g. by general access to content if you sign up for our newsletter, participate in competitions or surveys, register as a user or subscriber, otherwise use services or make purchases via the website.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  We typically collect and process the following types of information: A unique ID and technical information about your computer, tablet or mobile phone, your IP number, geographic location, and which pages you click on (interests). To the extent that you give explicit consent to this and enter the information yourself, the following are also processed: Name, telephone number, e-mail, address and payment information. This will typically be in connection with creating a login or when making a purchase.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Purpose</div>
                <div className="font-medium text-[16px] text-white/70">
                  The information is used to identify you as a user and provide the best requested service that will be most likely to be relevant to you, to register your purchases and payments, as well as to be able to provide the services you have requested, such as . to send a newsletter. In addition, we use the information to optimize our services and content.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  Period of storage The information is kept for the period of time permitted by law, and we delete it when it is no longer necessary. The period depends on the nature of the information and the background for storage. It is therefore not possible to specify a general time frame for when information is deleted.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Disclosure of information</div>
                <div className="font-medium text-[16px] text-white/70">
                  Data about your use of the website, which advertisements you receive and possibly clicks on, geographic location, gender and age segment, etc. are passed on to third parties to the extent that this information is known. You can see which third parties are involved in the section on Cookies above. The information is used for advertising targeting.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  We also use a number of third parties to store and process data. These only process information on our behalf and may not use it for their own purposes.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  We pass on information to the following companies in accordance with our purpose:
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  Stripe – used for handling payments.
                </div>
                <div className="font-medium text-[16px] text-white/70">
                  Socket.io – used for handling the real time communication.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  Disclosure of personal data such as name and e-mail etc. will only take place if you give consent to it. We only use data processors in countries (EU or USA) that can provide your information with sufficient protection.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Google Analytics</div>
                <div className="font-medium text-[16px] text-white/70">
                  We use Google Analytics to analyze the traffic on our website in order to optimize content and user experience for our visitors. You can opt out of cookies if you do not want tracking of your visit to our site, but your visit will not be linked to you as a person.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Right of withdrawal</div>
                <div className="font-medium text-[16px] text-white/70">
                  Cf. According to the Consumer Act, a 14-day right of withdrawal is granted on your purchase - but only if you have NOT used your subscription. If you therefore want to make use of the right of withdrawal, you must log out of your profile immediately after your purchase and do not log in again. You must then contact support to inform them that you have regretted your purchase. If you use your subscription, you cannot regret your purchase, but of course you can always unsubscribe from the ongoing subscription, so that you do not have to pay for an additional subscription period.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Cookies</div>
                <div className="font-medium text-[16px] text-white/70">
                  The website uses cookies, which are a text file that is saved on your computer, mobile phone etc. accordingly for the purpose of recognizing it, remembering settings, performing statistics and targeting ads. Cookies cannot contain harmful code such as virus.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  If you do not want information to be collected, it is possible to delete cookies and refrain from further use of our website.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  If you block cookies, you may risk that the website does not function optimally and that there is content that you cannot access.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Insights and complaints</div>
                <div className="font-medium text-[16px] text-white/70">
                  You have the right to be informed about which personal data we process about you. You can also object to the use of information at any time. If the information processed about you is incorrect, you have the right to have it corrected or deleted. Inquiries about this can be made to: support@sugarfar.dk. If you no longer wish for us to process your personal data or for us to limit the processing of your personal data, you can also send us a request to this effect to the above-mentioned e-mail address.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">Publisher</div>
                <div className="font-medium text-[16px] text-white/70">
                  The website is owned and published by:
                </div>
                <div className="font-medium text-[16px] text-white/70">
                  Disp I/S Maglebjergvej 6, 2800 Kongens Lyngby
                </div>
                <div className="font-medium text-[16px] text-white/70">
                  E-mail: support@sugarfar.dk
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default PrivacyPolicy