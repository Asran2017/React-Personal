export const ErrorMessage = ({ message, children }) => {
  return (
    <div className="mt-4 bg-red-200 border border-red-300 px-6 py-3 rounded-xl shadow-md">
      <p className="text-lg font-bold text-red-600 text-center">
        ⚠️ {message || children}
      </p>
    </div>
  );
};
