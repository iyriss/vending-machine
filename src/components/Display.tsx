type DisplayProps = {
  message: string;
};

export const Display = ({ message }: DisplayProps) => (
  <div className='mt-16 md:mt-5 bg-[#10111A] border-silver border text-[#41D965] text-2xl font-mono px-6 flex items-center rounded-md min-h-[80px] w-full max-w-[424px]'>
    {message}
  </div>
);
