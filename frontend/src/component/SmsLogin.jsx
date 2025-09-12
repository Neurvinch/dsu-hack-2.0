import React,{useState} from 'react'
import {useLoginWithSms} from "@privy-io/react-auth"

const SmsLogin = () => {
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code , setCode] = useState("");
    const {state, sendCode, loginWithCode} = useLoginWithSms()

    const handleSendCode = async () => {
        try {
            
        } catch (error) {
            
        }
    }

  return (
    <div>SmsLogin</div>
  )
}

export default SmsLogin