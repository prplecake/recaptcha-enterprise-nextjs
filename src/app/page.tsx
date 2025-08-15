"use client"; 

import { GoogleReCaptchaProvider,
    useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect } from "react";

function HomeContent() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleRecaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.error("Recaptcha not initialized");
            return;
        }

        const token = await executeRecaptcha("homepage");
        console.log("Recaptcha Token:", token);
    }, [executeRecaptcha]);

    useEffect(() => {
        if (executeRecaptcha) {
            handleRecaptchaVerify();
        }
    }, [executeRecaptcha, handleRecaptchaVerify]);

  return (
    <div>
      <h1>Welcome to the Recaptcha Example</h1>
      <p>This page demonstrates the use of Google Recaptcha.</p>
        <button onClick={handleRecaptchaVerify}
        >Submit</button>
    </div>
  );
}

export default function Home() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      useEnterprise={true}
      >
        <HomeContent />
      </GoogleReCaptchaProvider>
  )
}