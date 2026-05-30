export const ErrorMessage = ({ children }) => {
  return (
    <div>
      <p className="font-bold text-lg text-indigo-700 text-center">
        {children}
      </p>
    </div>
  );
};
