import { forgotPassword } from "../../../utils/user-api.ts"
import { useState } from "react";
import { Link } from "react-router-dom";
import FormHeader from "../../../componenets/FormHeader/FormHeader.tsx";
import FormField from "../../../componenets/FormField/FormField.tsx";
import FormSubmitButton from "../../../componenets/FormSubmitButton/FormSubmitButton.tsx";


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const isInvalid = !email;

   

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const emailValue = email; 
            const payload = { 
                email: emailValue 
            };
            await forgotPassword(payload); 
        } catch (err) {
            setIsSubmitted(true);
        } finally {
            setIsSubmitted(true);
        }
    }
    return (
        <>
            <div className="border-b border-edge text-center h-14 flex justify-center sm:justify-between w-full flex-shrink-0">
                <Link to="/" className="px-10 sm:px-20 sm:border-r sm:border-edge flex items-center justify-center cursor-pointer select-none hover:bg-hoverc/10 transition-all hover:text-hoverc">Return</Link>
                <div className="hidden sm:block px-20 sm:border-l sm:border-edge pt-4 whitespace-nowrap select-none">Reset Password</div>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
                {!isSubmitted ? (
                    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col w-full max-w-80 text-left">
                        <FormHeader text={"Forgot Password?"} />
                        <p className="text-sm mb-6 text-center">Enter your email and we'll send you a link to get back into your account.</p>
                        
                        <FormField fieldName="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={true} />
                        <FormSubmitButton buttonText={"Send Reset Link"} isInvalid={isInvalid} />
                        
                    </form>
                ) : (
                    <div className="max-w-80">
                        <h2 className="text-xl mb-4 font-semibold">Check your inbox</h2>
                        <p className="text-sm mb-6">
                            If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
                        </p>
                        <Link to="/login" className="text-sm underline hover:text-hoverc cursor-pointer">Return to Login</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default ForgotPassword