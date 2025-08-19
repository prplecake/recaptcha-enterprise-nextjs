"use client";
import {RECAPTCHA_SITE_KEY, Recaptcha} from "@/components/recaptcha";

export default function Home() {

  function onSubmit(token: string) {
    console.log("Recaptcha token received:", token);
  }

  return (
    <div>
      <h1>Welcome to the Recaptcha Example</h1>
      <p>This page demonstrates the use of Google Recaptcha.</p>
      <form id="test-form">
        <Recaptcha onToken={onSubmit}/>
        <button
          className="g-recaptcha"
          data-action="test_page"
          data-callback="recaptchaPolicyCallback"
          data-sitekey={RECAPTCHA_SITE_KEY}
        >Submit
        </button>
      </form>
    </div>
  );
}
