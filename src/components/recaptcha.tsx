"use client";

import React, {useEffect} from "react";
import Script from "next/script";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    recaptchaPolicyCallback?: (token: string) => void;
  }
}

type RecaptchaWrapperProps = {
  onToken: (token: string) => void;
};

export function Recaptcha({ onToken }: RecaptchaWrapperProps) {
  // Make the callback globally visible for `data-callback`
  useEffect(() => {
    window.recaptchaPolicyCallback = onToken;
    return () => {
      delete window.recaptchaPolicyCallback;
    };
  }, [onToken]);

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onLoad={() => {
          console.log("Recaptcha script loaded");
        }}
        strategy="afterInteractive"
      />
    </>
  );
}
