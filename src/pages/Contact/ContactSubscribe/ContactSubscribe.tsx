import FormHeader from "../../../componenets/FormHeader/FormHeader";
import FormField from "../../../componenets/FormField/FormField";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { contactSubscribe } from "../../../utils/contact-api";
import FormSubmitButton from "../../../componenets/FormSubmitButton/FormSubmitButton";
import FormError from "../../../componenets/FormError/FormError";

function ContactSubscribe() {
    const {listId} = useParams();

    const [confirmed, setConfirmed] = useState(false);
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setError("")
            const payload = {email: email}
            await contactSubscribe(payload, listId);
            setConfirmed(true);
        } catch {
            setError(`Error: Unable to subscribe ${email}, link may be invalid`)
        }
    }

    if (confirmed) {
        return (
      <>
        <div className="border-b border-edge text-center h-14 flex justify-center w-full flex-shrink-0">
            <div className="pt-4 whitespace-nowrap select-none">
            Verify subscription for: {email}
            </div>
        </div>
        <div className="flex flex-col my-auto pb-10 items-center justify-center h-64 text-center">
            
          <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
          <p className="mb-6">
            A confirmation has been sent. <br/> Follow the link to confirm.
          </p>
          <div
            onClick={() => setConfirmed(false)} 
            className="text-white hover:underline font-medium cursor-pointer"
          >
            Entered the wrong email? Try again.
          </div>
        </div>
      </>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full">
        <div className="border-b border-edge text-center h-14 flex justify-center w-full flex-shrink-0">
            <div className="pt-4 whitespace-nowrap select-none">
            Subscribe to mailing List
            </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow px-4 mt-10">
            <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full max-w-80"
            >
                <FormHeader text={'Subscribe to:'} />

                <FormField
                    fieldName="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    isRequired={true}
                />

                <FormSubmitButton buttonText={'Subscribe'} isInvalid={false} />
            
            </form>
            {error && <FormError errorText={error} />}
        </div>
        </div>
    )
}

export default ContactSubscribe;