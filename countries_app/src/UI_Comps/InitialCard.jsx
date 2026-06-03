export const InitialCard = ({ label, value }) => {
  return (
    <div>
      <p className="font-semibold text-lg font-heading">
        {label}
        <span className="font-body text-md text-blue-600">{value}</span>
      </p>
    </div>
  );
};
