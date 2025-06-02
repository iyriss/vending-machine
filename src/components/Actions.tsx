export type ActionProps = {
  onReturn: () => void;
  onCancel: () => void;
  disabled?: boolean;
};

export const Actions: React.FC<ActionProps> = ({
  onReturn,
  onCancel,
  disabled,
}) => {
  return (
    <div className='mt-6 flex items-center justify-between w-full gap-4 max-w-[424px] mx-auto'>
      <button
        onClick={onReturn}
        className='w-full bg-[#10111A] text-white hover:bg-[#23242f]'
        disabled={disabled}
        aria-label='Return Coins'
      >
        Return
      </button>

      <button
        onClick={onCancel}
        className={`w-full bg-[#10111A] text-white hover:bg-[#23242f]
          ${disabled && 'opacity-50 cursor-not-allowed'}
        `}
        disabled={disabled}
        aria-label='Cancel'
      >
        Cancel
      </button>
    </div>
  );
};
