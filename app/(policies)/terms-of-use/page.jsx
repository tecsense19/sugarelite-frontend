

import Image from "next/image"
import leftArrow from "/public/assets/arrow_left.svg"
import Link from "next/link"
import { client_routes } from "@/app/lib/helpers"
import { useStore } from "@/store/store"
import { Suspense } from "react"
import Loader from "@/components/common/Loader"
import { getAllStrings } from "@/app/lib/allStrings"

const TermsOfUse = async () => {

  const res = await getAllStrings()

  if (res?.success) {
    const allStrings = res.data
    return (
      <>
        <Suspense fallback={<Loader />}>
          <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
            <div className="p-4 py-6 flex flex-col text-white max-w-[700px]">
              <div className="relative flex flex-col justify-center items-center">
                {/* <Link className="absolute left-0" href={client_routes.home}>
                  <Image src={leftArrow} alt="" height={26} width={26} className="pointer-events-none" />
                </Link> */}
                <div className="text-[16px] font-semibold text-secondary uppercase">{allStrings["string_terms_of_use"]}</div>
                <p className="text-[26px] md:text-[32px] font-semibold text-center leading-[38px]">EliteSugar's <span>{allStrings["string_terms_of_use"]}</span></p>
              </div>
              <div className="mt-4 text-[16px] font-normal leading-[25px] text-white/70 text-justify">
                At Elitesugar, we strive to create security, and our members should have no doubt that they are in the best hands with us. Our focus is that all users must have a safe and good user experience. We encourage all our users to report any offensive, harassing, cross-border content that is intended to demean other users, or otherwise violates our Terms. All reports are carefully processed by our professional support team.
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">Conditions for profiles</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>To create a profile on Elitesugar you must be 18 years old.</li>
                  <li>When you create a profile and share content on Elitesugar, you consent to us showing your profile to the other users on Elitesugar, including on e-mail and the site.</li>
                  <li>It is not permitted to offer the recipient any kind of services, including sex. Disclaimer: Elitesugar is NOT an escort service. Our platform will in no way support or promote escort service or prostitution. Users who may attempt to exploit Elitesugar for similar services will be investigated and banned from our site without notice.</li>
                  <li>You may not use the Elitesugar site if you have been convicted of a sexual offence.</li>
                  <li>It is not permitted to disclose your or anyone else's e-mail address, Snapchat, Facebook, Skype, or any other form of contact information in your profile text.</li>
                  <li>It is not permitted to link to other websites from your profile or otherwise link visitors to your own or others' websites.</li>
                  <li>It is illegal to enter a fake or someone else's email address, phone number or other person's sensitive information.</li>
                  <li>When you enter your e-mail address, you simultaneously accept that we may send you newsletters. Newsletters may contain advertisements and other forms of advertising and marketing for Elitesugar. You can unsubscribe from our newsletters at any time.</li>
                  <li>Cf. "legislation on the processing of personal data" you as the user of the register have a number of rights which we must ensure to fulfill at all times. You have the right to request the following from us: to have access to change or delete your personal data. If you no longer want us to process your personal data or limit the processing of your personal data, please refrain from using Elitesugar.</li>
                  <li>By uploading images, the user agrees that Elitesugar has the right to modify the material and to reject or delete the material at its discretion.</li>
                  <li>Profiles whose primary purpose is assessed to be the sale of videos, photos, webcam shows, phone calls or the like and have the character of actual prostitution will be deleted/blocked without notice.</li>
                </ul>
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">Conditions for profile photos</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>The picture must be of yourself.</li>
                  <li>The image must not contain logos, links or references to other websites.</li>
                  <li>The image must not contain contact information.</li>
                  <li>The image must not contain offensive, hateful, violent, threatening or illegal activity.</li>
                  <li>The image must not be highly erotic or pornographic, so breasts and genitals must be covered.</li>
                  <li>The image must be current and you must have the copyright.</li>
                  <li>The image must not contain wasted space and must be oriented correctly.</li>
                </ul>
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">Conditions for profile content, including profile texts, sending messages, and profile names</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>Profile text must not contain contact information (neither social networks, telephone numbers nor any other forms of communication tools).</li>
                  <li>It is not allowed to offer money for sexual services. Activities suspected of involving escort service, prostitution or the like will result in immediate closure of the profile without warning. This includes all profile content (profile text, profile name and images).</li>
                  <li>It is not permitted to write with the purpose of expressing negative or condescending opinions about the recipient.</li>
                  <li>Profile names must not contain contact information, including email, social media links or website addresses.</li>
                  <li>The profile name must be sober, and must not have a grossly vulgar or offensive character.</li>
                  <li>Profile text must not contain derogatory or racist remarks about other people or groups.</li>
                  <li>Elitesugar can at any time, without notice, delete posts or profiles if one or more of the above conditions are not met. We have the right to look at a profile's content and personal messages at any time if the profile is reported or if there is a suspicion that the profile violates the guidelines. All content will remain confidential at all times.</li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-y-3 mb-3 text-white/70">
                <p className="leading-[25px]">We discourage all users from giving money to people they do not know. Inquiries of this nature are most often intended to get money out of people, and the money is never seen again.</p>

                <p className="leading-[25px]">We discourage all users from disclosing sensitive information, including personal information such as contact details, address and account numbers.</p>

                <p className="leading-[25px]">Elitesugar has been created as a communication platform between the site's users. We cannot therefore assume responsibility for communication or material that the site's users send to each other. If you have had an unpleasant experience with a user, you are of course welcome to contact us. We will then investigate the matter and, if necessary, we will use the powers that accrue to us, including in accordance with these conditions.</p>

                <p className="leading-[25px]">We encourage everyone to report profiles via the report button for any violations of the above conditions. In case of doubt regarding the interpretation of these conditions, only Elitesugar makes the final decision.</p>

                <p className="leading-[25px]">The above conditions are governed by and interpreted in accordance with Danish legislation. Elitesugar reserves the right, without reservation or notice, to delete/change profiles that exploit our platform commercially or contain any other form of advertising that is objectionable, untrue, discriminatory, libelous, does not comply with the terms of use and is otherwise deemed not to comply for the site's purpose, concept and general purpose. Elitesugar reserves the right to delete the profile if authenticity cannot be proven. This applies regardless of whether the user has paid for a service that has not yet been delivered. In the event that Danish legislation is violated, the offense will be reported to the police, including IP numbers used for login/creation as well as any other relevant information about the user and content posted in relation to the violation.</p>

              </div>
            </div>
          </div>
        </Suspense>
      </>
    )
  }

}

export default TermsOfUse