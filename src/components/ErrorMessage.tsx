const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return <div>Something went wrong</div>;
  return (
    <div className="text-white w-full h-[300px] flex justify-center items-center text-lg">
      Error: {message}
    </div>
  );
};

export default ErrorMessage;
