type CancelButtonProps = {
  onCancel: () => void;
  text: string;
};

function CancelButton({ onCancel, text }: CancelButtonProps) {
  return (
    <button
      onClick={onCancel}
      className="border border-hover px-6 py-2 font-semibold hover:bg-white/20 transition-colors"
    >
      {text}
    </button>
  );
}

export default CancelButton;
