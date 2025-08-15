import { RecaptchaWrapper } from "@/components/recaptcha-wrapper";

export default function Home() {

    async function onSubmit(formData: FormData) {
        "use server";
        const rawFormData = Object.fromEntries(formData);
        console.log("Form Data:", rawFormData);
        // Here you can send the token to your server for verification
    }

  return (
    <div>
      <h1>Welcome to the Recaptcha Example</h1>
      <p>This page demonstrates the use of Google Recaptcha.</p>
      <form action={onSubmit}>
      <RecaptchaWrapper action="homepage" />
        <button type="submit"
        >Submit</button>
      </form>
    </div>
  );
}
