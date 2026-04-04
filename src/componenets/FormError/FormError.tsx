type FormErrorProps = {
  errorText: string;
};
function FormError({ errorText }: FormErrorProps) {
  return (
    <p className="text-red-500 text-xs mt-4 text-center my-10 whitespace-pre-line">
      {errorText}
    </p>
  );
}

export default FormError;
