"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
    interface Window {
        grecaptcha: {
            enterprise: {
                ready: (cb: () => void) => void;
                execute: (siteKey: string, options: { action: string }) => Promise<string>;
            };
        };
    }
}

export function RecaptchaWrapper({action}: { action: string }) {
    const tokenInputRef = useRef<HTMLInputElement | null>(null);

    function executeRecaptcha() {
        if (typeof window.grecaptcha === "undefined") {
            console.error("Recaptcha is not loaded.");
            return;
        }
        window.grecaptcha.enterprise.ready(async () => {
            try {
                console.log("Executing Recaptcha for action:", action);
                const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
                console.log("Recaptcha token received:", token);
                if (tokenInputRef.current) {
                    tokenInputRef.current.value = token;
                }
            } catch (error) {
                console.error("Error executing Recaptcha:", error);
            }
        });
    }

    return (
        <>
        <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} 
            onLoad={() => {
                console.log("Recaptcha script loaded");
                executeRecaptcha();
            }}
            strategy="afterInteractive"
            />
            <input type="hidden" name="recaptcha-token" id="recaptcha-token" ref={tokenInputRef} />
        </>
    );
}

