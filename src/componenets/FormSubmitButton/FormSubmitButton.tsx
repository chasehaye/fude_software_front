type FormSubmitButtonProps = {
  isInvalid: boolean;
  buttonText: string;
};

function FormSubmitButton({ isInvalid, buttonText }: FormSubmitButtonProps) {
    return (
        <button 
            type="submit" 
            disabled={isInvalid} 
            className="mt-4 border border-edge py-2 hover:bg-hoverc/10 hover:text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all">
                {buttonText}
        </button>
    );
}

export default FormSubmitButton