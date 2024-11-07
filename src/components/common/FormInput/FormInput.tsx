import { forwardRef } from "react";
import "./FormInput.scss";
// https://zh-hans.react.dev/reference/react/forwardRef 使用 forwardRef() 让组件接收 ref 并将其传递给子组件
const FormInput = forwardRef((props: any, ref) => {
  return (
    <label className={`form-input`}>
      <input
        ref={ref}
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="input"
      />
    </label>
  );
});

export default FormInput;
