import { useNavigate } from 'react-router-dom';
type ButtonProps = {
  text: string;
  link: string;
};
function Button({ text, link }: ButtonProps) {
    const navigate = useNavigate();
    return(
        <>
            <button 
                onClick={() => navigate(link)}
                className="border border-edge hover:border-hover px-4 py-6 w-40 
                cursor-pointer hover:text-hoverc transition-colors hover:bg-hoverc/10 disabled:opacity-50"
            >
                {text}
            </button>
        </>
    )
}

export default Button