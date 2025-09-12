import React,{useState} from 'react'
import {useLoginWithSms} from "@privy-io/react-auth"

const SmsLogin = () => {
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code , setCode] = useState("");
    const {state, sendCode, loginWithCode} = useLoginWithSms()

    const handleSendCode = async () => {
        try { 
            await sendCode({phoneNumber})
            
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    }

    const handleLogin = async  () => {
        try {
            await loginWithCode({code})
            
        } catch (error) {
            console.error("Error logging in with OTP:", error);
        }
    }

  return (
    <div>
      {state.status === 'initial' && (
        <>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSendCode}>Send OTP</button>
        </>
      )}

      {state.status === 'awaiting-code-input' && (
        <>
          <input
            type="text"
            placeholder="Enter OTP code"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button onClick={handleLogin}>Login with Code</button>
        </>
      )}

      {state.status === 'error' && (
        <div>Error: {state.error?.message}</div>
      )}
    </div>
    
  )
}

export default SmsLogin