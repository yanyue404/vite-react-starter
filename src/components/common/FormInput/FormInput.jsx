import { forwardRef } from "react";
import "./FormInput.scss";

// https://zh-hans.react.dev/reference/react/forwardRef 使用 forwardRef() 让组件接收 ref 并将其传递给子组件
const FormInput = forwardRef((props, ref) => {
  return (
    <label className={`form-input`}>
      <input
        ref={ref}
        type="text"
        value={props.value || ""}
        onChange={(e) => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        inputMode={props.inputMode}
        className="input"
      />
    </label>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
