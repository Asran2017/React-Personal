export const DetailsRow = ({ label, value, children }) => {
  return (
    <>
      {children ? (
        <div>{children}</div>
      ) : (
        <div>
          <p className="font-bold font-heading text-lg text-blue-700">
            {label}
          </p>
          <p className="text-xl font-body font-semibold text-cyan-500">
            {value}
          </p>
        </div>
      )}
    </>
  );
};
