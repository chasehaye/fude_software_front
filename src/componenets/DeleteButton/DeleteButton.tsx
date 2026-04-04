type DeleteButtonProps = {
  onDelete: () => void;
  text: string;
};

function DeleteButton({ onDelete, text }: DeleteButtonProps) {
    return (
        <button 
            onClick={onDelete}
            className="border border-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700 transition-colors"
        >
            {text}
        </button>
    );
}

export default DeleteButton;
