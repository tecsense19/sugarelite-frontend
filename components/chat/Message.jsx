import Image from 'next/image'
import React from 'react'

const Message = ({ user, item, messages, idx }) => {
  return (
    <>
      {user.id === item.from.id
        ? <div className="flex items-end max-w-[75%] flex-col lg:flex-row">
          {messages[idx - 1]
            ? <>
              {item.from.id !== messages[idx - 1].from.id
                ? <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none rounded-full mb-[10px]" />
                : <></>
              }
            </>
            : <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none rounded-full mb-[10px]" />
          }
          <div className="px-5 py-[10px] rounded-[15px] max-w-full lg:max-w-[calc(100%-60px)] rounded-tr-[0px] lg:rounded-tr-[15px] lg:rounded-br-[0px] bg-secondary flex flex-col items-start">
            <div className="flex justify-start items-end">
              <div className="text-[20px] font-medium leading-[20px]"> {item.from.name} </div>
              <div className="ms-5 text-[16px] italic font-normal leading-[20px] text-white/70"> {item.time} </div>
            </div>
            <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
              {item.message}
            </div>
          </div>
          {messages[idx + 1]
            ? <>
              {item.from.id !== messages[idx + 1].from.id
                ? <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="hidden lg:block pointer-events-none rounded-full ms-5" />
                : <div className="hidden lg:block w-[60px]"></div>
              }
            </>
            : <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="hidden lg:block pointer-events-none rounded-full ms-5" />
          }
        </div>
        : <div className="flex items-start max-w-[75%] flex-col lg:flex-row">
          {messages[idx - 1]
            ? <>
              {item.from.id !== messages[idx - 1].from.id
                ? <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none rounded-full mb-[10px]" />
                : <></>
              }
            </>
            : <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none rounded-full mb-[10px]" />
          }
          {messages[idx + 1]
            ? <>
              {item.from.id !== messages[idx + 1].from.id
                ? <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="hidden lg:block pointer-events-none rounded-full me-5" />
                : <div className="hidden lg:block w-[60px]"></div>
              }
            </>
            : <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="hidden lg:block pointer-events-none rounded-full me-5" />
          }
          <div className="px-5 py-[10px] max-w-full lg:max-w-[calc(100%-60px)] rounded-[15px] rounded-tl-[0px] lg:rounded-tl-[15px] lg:rounded-bl-[0px] break-words bg-primary-dark-3">
            <div className="flex justify-start items-end">
              <div className="text-[20px] font-medium leading-[20px]"> {item.from.name} </div>
              <div className="ms-5 text-[16px] italic font-normal leading-[20px] text-white/70"> {item.time} </div>
            </div>
            <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
              {item.message}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Message