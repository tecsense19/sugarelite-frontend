"use client"

import { Checkbox, ConfigProvider, Select, Slider } from 'antd';
import Image from 'next/image';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import chevron_down from "../../public/assets/chevron-down.svg"

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
  { name: "Elite Daddy", value: "eliteDaddy" },
  { name: "Elite Boy", value: "eliteBoy" },
  { name: "Elite Mama", value: "eliteMama" },
  { name: "Elite Babe", value: "eliteBabe" }
]
const countries = [
  { img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg", name: "Denmark", value: "denmark" },
  { img: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg", name: "India", value: "india" },
  { img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg", name: "China", value: "china" },
  { img: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg", name: "Japan", value: "japan" },
  { img: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg", name: "Sweden", value: "sweden" }
]

const Filters = () => {
  const { register, handleSubmit, control, watch, reset, setValue } = useForm()

  useEffect(() => {
    reset(watch())
    const AOS = require("aos");
    AOS.init();
  }, [])

  const submitHandler = () => {
    console.log(watch())
  }

  return (
    // Filter Section
    <div className="bg-primary-dark-3 h-full max-h-full overflow-y-auto min-w-[350px] xl:min-w-[380px] p-[30px] text-white filter-container hidden md:block" style={{ scrollbarWidth: "none" }} data-aos="fade-right" data-aos-duration="800">
      <button className="bg-black w-full flex items-center justify-center h-[56px] text-white/80 text-[16px] font-[600] rounded-[5px]" style={{ lineHeight: "normal" }} onClick={() => reset()}>
        RESET SEARCH
      </button>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label className="w-full">
          <div className="text-white text-[16px] font-[500] mt-[20px] mb-[5px]" style={{ lineHeight: "normal" }}>Search by name</div>
          <input type="text" placeholder="Search..." {...register('name', { required: true })} className="bg-primary text-white outline-none border border-white/30 rounded-[5px] h-[56px] text-[15px] font-[300] px-[20px] w-full" style={{ lineHeight: "normal" }} />
        </label>

        <div className="mt-[30px]">
          <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age from ( {watch("age_from")} )</div>
          <Controller name="age_from" control={control} defaultValue={18} render={({ field }) => (
            <ConfigProvider theme={customSliderTheme}>
              <Slider {...field} className="!mt-[15px] !mb-0 !mx-[10px]" min={18} max={99}
                onChange={(val) => { (val <= watch("age_to")) ? setValue("age_from", val) : setValue("age_to", val); setValue("age_from", val) }}
              />
            </ConfigProvider>
          )} />
        </div>

        <div className="mt-[25px]">
          <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age to ( {watch("age_to")} )</div>
          <Controller name="age_to" control={control} defaultValue={30} render={({ field }) => (
            <ConfigProvider theme={customSliderTheme}>
              <Slider {...field} className="!mt-[15px] !mb-0 !mx-[10px]" min={18} max={99}
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
          <Controller name="country" control={control} defaultValue={countries[0]} render={({ field }) => (
            <ConfigProvider theme={customDropdownTheme}>
              <Select {...field} placeholder="Select Country" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                className="w-full text-[16px] font-[400] text-white/80"
                filterOption={(input, option) => {
                  return option.children.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}>
                {countries.map((ctry) => (
                  <Option className="!flex !items-center !justify-center" key={ctry.value} value={ctry.value}>
                    <div className='flex justify-start items-center text-[16px] font-[500]'>
                      <Image src={ctry.img} alt='' height={20} width={20} className='aspect-square me-3' />
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
              <Select {...field} placeholder="Select Region" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                className="w-full text-[16px] font-[400] text-white/80"
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}>
                {countries.map((ctry) => (
                  <Option className="text-[16px] font-[500]" key={ctry.value} value={ctry.value}>
                    {ctry.name}
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
        <button className='mt-[30px] text-white/80 text-[16px] font-[600] bg-secondary h-[56px] text-center w-full rounded-[5px]' style={{ lineHeight: "normal" }}>
          SAVE SEARCH
        </button>
        <div className='mt-[14px] text-[16px] font-[450] w-full text-center text-white/80' style={{ lineHeight: "normal" }}>Profile found: 499</div>
      </form>
    </div >
  )
}

export default Filters