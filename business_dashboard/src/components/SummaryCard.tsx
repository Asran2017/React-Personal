export function SummaryCard({ values }: { values: number[] }) {
  return (
    <div>
      <ul>
        {values.map((value) => (
          <li>{value}</li>
        ))}
      </ul>
    </div>
  );
}
