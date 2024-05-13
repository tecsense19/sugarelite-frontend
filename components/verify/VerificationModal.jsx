
import { ConfigProvider, Modal, notification } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import VerificationStep1 from './VerificationStep1';
import VerificationStep2 from './VerificationStep2';
import VerificationStep3 from './VerificationStep3';
import VerificationStep4 from './VerificationStep4';
import { verify_identity_action } from '@/app/lib/actions';
import { client_notification } from '@/app/lib/helpers';

const VerificationModal = ({ user, setIsModalOpen, isModalOpen }) => {

  // const { handleSubmit, register, reset } = useForm()
  const [api, contextHolder] = notification.useNotification()
  const [isLoading, setIsLoading] = useState(false);
  const initialStep = 1;
  const maxStep = 4;
  const [step, setStep] = useState(initialStep);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState("")

  const nextStepHandler = () => {
    if (step === maxStep) {
    } else {
      setStep(step + 1);
    }
  }

  const backStepHandler = () => {
    if (step === 1) {
    } else {
      setStep(step - 1);
    }
  }

  const closeModal = () => {
    setConfirmationModal(true);
  }

  const confirmCloseModal = () => {
    setStep(initialStep);
    setIsModalOpen(false);
    setConfirmationModal(false);
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { files } = e.target;
    if (files[0]) {
      let file = await getBase64(files[0]);
      let obj = {};
      obj.photo_url = file;
      obj.file = files[0];
      setUploadedPhoto(obj);
    }
    nextStepHandler();
    e.target.value = ""
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    let formdata = new FormData;
    formdata.append("user_id", user.id)
    formdata.append("file", uploadedPhoto.file)
    formdata.append("government_id_name", selectedIdentity)
    let res = await verify_identity_action(formdata);
    console.log(res);
    if (res.success) {
      client_notification(api, "topRight", "success", res.message, 3)
      window.location.reload();
    } else {
      client_notification(api, "topRight", "error", res.message, 3)
    }
    setStep(1);
    setIsModalOpen(false);
    setConfirmationModal(false);
    setIsLoading(false);
  }

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: { Modal: { titleColor: "#070F2B", titleFontSize: "22px", padding: 0 } },
          "token": { "colorPrimary": "#f16667", "colorInfo": "#f16667", "colorBgBase": "#ffffff" }
        }} >
        <Modal closeIcon={false} centered={true} open={isModalOpen} footer={null} className='verify-container m-3 !w-[454px]'>
          {/* <div className='w-full h-full'> */}
          <div className='w-full bg-white text-primary-dark-3'>
            {step === 1 && <VerificationStep1 nextStepHandler={nextStepHandler} closeModal={closeModal} />}
            {step === 2 && <VerificationStep2 user={user} nextStepHandler={nextStepHandler} backStepHandler={backStepHandler} closeModal={closeModal} selectedIdentity={selectedIdentity} setSelectedIdentity={setSelectedIdentity} />}
            {step === 3 && <VerificationStep3 nextStepHandler={nextStepHandler} backStepHandler={backStepHandler} closeModal={closeModal} selectedIdentity={selectedIdentity} handleChange={handleChange} />}
            {step === 4 && <VerificationStep4 backStepHandler={backStepHandler} closeModal={closeModal} uploadedPhoto={uploadedPhoto} handleSubmit={handleSubmit} isLoading={isLoading} />}
          </div>
          {/* </div> */}
        </Modal>

        <Modal closeIcon={false} centered={true} open={confirmationModal} footer={null} className='verify-cancel-container m-3 !w-[400px]'>
          <div className='w-full bg-white text-primary-dark-3 px-5 pt-4 pb-5'>
            <div className='text-center text-black text-[22px] font-bold leading-[32px]'>
              Cancel Verification
            </div>
            <div className='mt-3 md:mt-4 text-center text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
              Are you sure you want to cancel?
            </div>
            <div className='mt-5 flex gap-x-[20px]'>
              <button className='w-full rounded-[5px] bg-tinder text-white h-10 md:h-[56px] text-[18px] font-semibold leading-[20px]' onClick={() => setConfirmationModal(false)}>RESUME</button>
              <button className='w-full rounded-[5px] border-secondary border-[2px] text-secondary h-10 md:h-[56px] text-[18px] font-semibold leading-[20px]' onClick={confirmCloseModal}>CANCEL</button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>

    </>
  )
}

export default VerificationModal