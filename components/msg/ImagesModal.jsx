import { ConfigProvider, Modal } from 'antd'
import CloseIcon from '/public/assets/close.svg'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';


import { EffectCoverflow, } from 'swiper/modules';
import axios from 'axios'

const ImagesModal = ({ setSelctedImages, list }) => {

    const handleDownloadImages = async () => {
        try {
            for (const image of list) {
                let imageUrl = image.chat_images;
                // const imageName = imageUrl.split('/public_images/')[1];
                // const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                // const blob = new Blob([response.data], { type: response.headers['content-type'] });
                // const link = document.createElement('a');
                // link.href = window.URL.createObjectURL(blob);
                // link.download = imageName;
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading images:', error);
        }
    };


    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        titleColor: "#070F2B",
                        titleFontSize: "22px",
                        padding: 0,
                    },
                },
                "token": {
                    "colorPrimary": "#f16667",
                    "colorInfo": "#f16667",
                    "colorBgBase": "#2d2d2d",
                    "colorTextBase": "#ffffff"
                }
            }}
        >

            <Modal
                closeIcon={false}
                centered={true}
                open={list.length}
                footer={null}
                className='report-container'
                width={720}
            >
                <div className='w-full text-white'>
                    <div className=' border-t-[6px] border-secondary bg-black pb-2 rounded-t-md w-full text-xl justify-between  flex items-center pt-[2px] px-5 text-Primary font-semibold '>
                        <div className='flex gap-3 items-center mt-1'>
                            Images/Videos
                        </div>
                        <Image src={CloseIcon} alt='colse' width={24} height={24} onClick={() => { setSelctedImages([]) }} className='cursor-pointer mt-1' />
                    </div>
                    <div className='h-[40rem] w-full flex flex-col items-center'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 2.5,
                            }}
                            modules={[EffectCoverflow]}
                            className="w-full md:w-[90%] h-[85%] mt-8"
                        >
                            {
                                list.map((i, inx) => {
                                    return (
                                        <SwiperSlide className='rounded-md bg-primary-dark max-w-[85%] md:max-w-[70%] w-full h-full relative' key={inx}>
                                            <Image src={i.chat_images} alt='colse' width={1000} height={1000} className=' h-full w-full object-contain' />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        <button type='button' className='mt-5 bg-secondary px-4 py-2 rounded-[5px]' onClick={handleDownloadImages}>Download</button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default React.memo(ImagesModal)