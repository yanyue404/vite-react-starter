import "./FormRow.scss";
export default function FormRow({ title, noborder = false, round = false, onAction = () => {}, children }) {
  return (
    <div className={`form-row ${noborder ? "noborder" : ""} ${round ? "round" : ""}`}>
      <label onClick={onAction}>
        <span>{title}</span>
      </label>
      {children}
    </div>
  );
}
