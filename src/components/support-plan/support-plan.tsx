import { memo } from "react";
import "./support-plan.scss";

export default memo(function SupportPlan() {
  console.log("support-plan render.");

  return (
    <div className="plan">
      <div className="title">联系人</div>
      <div className="bxj">
        <ul>
          <li>姓名</li>
          <li>电话</li>
          <li>家庭住址</li>
        </ul>
        <ul style={{ textAlign: "right" }}>
          <li>张三</li>
          <li>133123341234</li>
          <li>北京市昌平区</li>
        </ul>
      </div>
    </div>
  );
});
