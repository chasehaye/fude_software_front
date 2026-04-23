type FormHeaderProps = {
  text: string;
};

function FormHeader({ text }: FormHeaderProps) {
  return <h2 className="text-xl mb-6 font-semibold text-center">{text}</h2>;
}

export default FormHeader;
