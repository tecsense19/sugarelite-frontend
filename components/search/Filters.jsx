"use client"

import { Checkbox, ConfigProvider, Select, Slider } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import chevron_down from "../../public/assets/chevron-down.svg"
import { useStore } from '@/store/store';
import { Countries } from '@/app/lib/constants';

const { Option } = Select;

const customSliderTheme = {
  token: { colorBgElevated: "#2d2d2d", colorPrimaryBorderHover: "white", borderRadiusXS: 50 },
  components: {
    Slider: {
      handleColor: "white", handleActiveColor: "white",
      handleSize: 20, handleSizeHover: 20, handleLineWidth: 2, handleLineWidthHover: 2,
      railBg: "rgba(255,255,255,0.08)", railHoverBg: "rgba(255,255,255,0.08)", railSize: 10,
      trackBg: "black", trackHoverBg: "black"
    }
  }
};

const customDropdownTheme = {
  token: { borderRadius: '5px', colorPrimary: "#6C6C6C", controlPaddingHorizontal: 2 },
  components: {
    Select: {
      selectorBg: "#2d2d2d", boxShadow: "none",
      colorBorder: "#6C6C6C", colorTextPlaceholder: "rgba(255,255,255,0.5)", colorText: "rgba(255,255,255,0.8)",
      colorSuccessBorderHover: "none", colorInfoBorderHover: "none", colorTextActive: "black",
      controlItemBgHover: "none", controlHeight: "56px", controlOutline: "none",
      optionSelectedColor: "black", optionSelectedBg: "rgba(255,255,255,0.8)", optionPadding: '8px 12px',
      optionHeight: "auto", optionActiveBg: "rgba(255,255,255,0.2)"
    },
  }
}

const sugarTypes = [
  { name: "Elite Daddy", value: "EliteDaddy" },
  { name: "Elite Boy", value: "EliteBoy" },
  { name: "Elite Mama", value: "EliteMama" },
  { name: "Elite Babe", value: "EliteBabe" }
]

const Filters = ({ allUsers, register, handleSubmit, control, watch, setValue, Controller, submitHandler, reset, cities, setCities, handleReset, dummyUsers }) => {


  // const [cities, setCities] = useState([])

  const { dispatch } = useStore()

  useEffect(() => {
    reset(watch())
    const AOS = require("aos");
    AOS.init();
  }, [])

  // const submitHandler = () => {
  //   // console.log("Submit ::", watch())
  //   const selectedMenu = watch();
  //   let dummyData = allUsers;
  //   // For name
  //   dummyData = dummyData.filter((item) => {
  //     if (item.username.toLowerCase().includes(selectedMenu.name.toLowerCase())) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })

  //   // For age
  //   dummyData = dummyData.filter((item) => {
  //     if (item.age) {
  //       if (selectedMenu.age_from <= item.age && selectedMenu.age_to >= item.age) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     } else {
  //       return true
  //     }
  //   })

  //   // For sugartype
  //   if (selectedMenu.sugar_type) {
  //     dummyData = dummyData.filter((item) => {
  //       if (selectedMenu.sugar_type === item.sugar_type) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   }

  //   // For Country
  //   if (selectedMenu.country) {
  //     dummyData = dummyData.filter((item) => {
  //       if (selectedMenu.country === item.country) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   }

  //   // For Region
  //   if (selectedMenu.region) {
  //     dummyData = dummyData.filter((item) => {
  //       if (selectedMenu.region === item.region) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   }

  //   // For has profile picture
  //   if (selectedMenu.has_profile_picture) {
  //     dummyData = dummyData.filter((item) => {
  //       if (item.avatar_url) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   }

  //   // For has public picture
  //   if (selectedMenu.has_public_photos) {
  //     dummyData = dummyData.filter((item) => {
  //       if (item.get_all_profileimg && item.get_all_profileimg.length) {
  //         let flag = false;
  //         for (let tempObj of item.get_all_profileimg) {
  //           if (tempObj.image_type === "public") {
  //             flag = true;
  //             break
  //           }
  //         }
  //         if (flag) {
  //           return true
  //         } else {
  //           return false
  //         }
  //       } else {
  //         return false
  //       }
  //     })
  //   }

  //   // For is verified
  //   if (selectedMenu.is_verified) {
  //     dummyData = dummyData.filter((item) => {
  //       if (item.premium !== "false") {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //   }
  //   // console.log("dummyData :: ", dummyData)
  //   dispatch({ type: "all_users_data", payload: dummyData })
  //   setDummyUsers(dummyData)
  // }

  // const handleReset = () => {
  //   reset()
  //   // submitHandler()
  //   // dispatch({ type: "all_users_data", payload: allUsers })
  //   // setDummyUsers(allUsers)
  // }

  return (
    // Filter Section
    <div className="bg-primary-dark-3 h-full max-h-full overflow-y-auto min-w-[350px] xl:min-w-[380px] p-[30px] text-white filter-container hidden md:block" style={{ scrollbarWidth: "none" }} data-aos="fade-right" data-aos-duration="800">
      <button className="bg-black w-full flex items-center justify-center h-[56px] text-white/80 text-[16px] font-[600] rounded-[5px] transition-all duration-150 hover:scale-[1.02]" style={{ lineHeight: "normal" }} onClick={() => handleReset()}>
        RESET SEARCH
      </button>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label className="w-full">
          <div className="text-white text-[16px] font-[500] mt-[20px] mb-[5px]" style={{ lineHeight: "normal" }}>Search by name</div>
          <input type="text" placeholder="Search..." {...register('name')} className="bg-primary text-white outline-none border border-white/30 rounded-[5px] h-[56px] text-[15px] font-[300] px-[20px] w-full" style={{ lineHeight: "normal" }} />
        </label>

        <div className="mt-[30px]">
          <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age from ( {watch("age_from")} )</div>
          <Controller name="age_from" control={control} defaultValue={1} render={({ field }) => (
            <ConfigProvider theme={customSliderTheme}>
              <Slider {...field} className="!mt-[15px] !mb-0 !mx-[10px]" min={1} max={99}
                onChange={(val) => { (val <= watch("age_to")) ? setValue("age_from", val) : setValue("age_to", val); setValue("age_from", val) }}
              />
            </ConfigProvider>
          )} />
        </div>

        <div className="mt-[25px]">
          <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age to ( {watch("age_to")} )</div>
          <Controller name="age_to" control={control} defaultValue={99} render={({ field }) => (
            <ConfigProvider theme={customSliderTheme}>
              <Slider {...field} className="!mt-[15px] !mb-0 !mx-[10px]" min={1} max={99}
                onChange={(val) => { (watch("age_from") <= val) ? setValue("age_to", val) : setValue("age_from", val); setValue("age_to", val) }} />
            </ConfigProvider>
          )} />
        </div>

        <div className='mt-[27px] flex justify-end items-center relative'>
          <Controller name="sugar_type" control={control} render={({ field }) => (
            <ConfigProvider theme={customDropdownTheme}>
              <Select {...field} placeholder="Select Sugar Type" optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                className="w-full text-[14px] font-[300]">
                {sugarTypes.map((type) => (
                  <Option key={type.value} value={type.value} >
                    {type.name}
                  </Option>
                ))}
              </Select>
              <Image src={chevron_down} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none' />
            </ConfigProvider>
          )}
          />
        </div>

        <div className='mt-[15px] flex justify-center items-center relative country-container'>
          <Controller name="country" control={control} render={({ field }) => (
            <ConfigProvider theme={customDropdownTheme}>
              <Select {...field} placeholder="Select Country" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                className="w-full text-[16px] font-[400] text-white/80"
                filterOption={(input, option) => {
                  return option.children.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}>
                {Countries.map((ctry) => (
                  <Option className="!flex !items-center !justify-center" key={ctry.name} value={ctry.name}>
                    <div className='flex justify-start items-center text-[16px] font-[500]'>
                      <Image src={ctry.flag} alt='' height={20} width={20} className='aspect-square me-3' />
                      {ctry.name}
                    </div>
                  </Option>
                ))}
              </Select>
              <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={20} height={20} priority className='absolute left-[calc(100%-36px)] pointer-events-none' />
            </ConfigProvider>
          )}
          />
        </div>

        <div className='mt-[30px] flex justify-center items-center relative'>
          <Controller name="region" control={control} render={({ field }) => (
            <ConfigProvider theme={{ ...customDropdownTheme, components: { Select: { ...customDropdownTheme.components.Select, selectorBg: "#6C6C6C" } } }}>
              <Select {...field} placeholder="Select City" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                className="w-full text-[16px] font-[400] text-white/80"
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}>
                {cities.map((ctry, inx) => (
                  <Option className="text-[16px] font-[500]" key={inx} value={ctry}>
                    {ctry}
                  </Option>
                ))}
              </Select>
              <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={20} height={20} priority className='absolute left-[calc(100%-36px)] pointer-events-none' />
            </ConfigProvider>
          )} />
        </div>

        <div className='mt-[30px]'>
          <label className='flex justify-between cursor-pointer'>
            <div className='text-white/80 text-[16px] font-[500] select-none' style={{ lineHeight: "normal" }}>Has a profile picture</div>
            <Controller name="has_profile_picture" defaultValue={false} control={control} render={() => (
              <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                <Checkbox className='h-6 w-6 flex justify-end' onChange={(e) => setValue("has_profile_picture", e.target.checked)} checked={watch("has_profile_picture")} />
              </ConfigProvider>
            )} />
          </label>
        </div>
        <div className='mt-5'>
          <label className='flex justify-between cursor-pointer mt-5'>
            <div className='text-white/80 text-[16px] font-[500] select-none' style={{ lineHeight: "normal" }}>Has a public photos</div>
            <Controller name="has_public_photos" defaultValue={false} control={control} render={() => (
              <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                <Checkbox className='h-6 w-6 flex justify-end' onChange={(e) => setValue("has_public_photos", e.target.checked)} checked={watch("has_public_photos")} />
              </ConfigProvider>
            )} />
          </label>
        </div>
        <div className='mt-5'>
          <label className='flex justify-between cursor-pointer mt-5'>
            <div className='text-white/80 text-[16px] font-[500] select-none' style={{ lineHeight: "normal" }}>Is verified</div>
            <Controller name="is_verified" defaultValue={false} control={control} render={() => (
              <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                <Checkbox className='h-6 w-6 flex justify-end' onChange={(e) => setValue("is_verified", e.target.checked)} checked={watch("is_verified")} />
              </ConfigProvider>
            )} />
          </label>
        </div>
        <button type='submit' className='mt-[30px] text-white/80 text-[16px] font-[600] bg-secondary h-[56px] text-center w-full rounded-[5px] transition-all duration-150 hover:scale-[1.02]' style={{ lineHeight: "normal" }}>
          SAVE SEARCH
        </button>
        <div className='mt-[14px] text-[16px] font-[450] w-full text-center text-white/80' style={{ lineHeight: "normal" }}>Profile found: {dummyUsers.length}</div>
      </form>
    </div >
  )
}

export default Filters