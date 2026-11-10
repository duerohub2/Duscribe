export default function PixelSelect({ label, value, onChange, options }) {
  return (
    <>
      <label className="label">{label}</label>
      <select value={value} onChange={onChange} className="select">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
