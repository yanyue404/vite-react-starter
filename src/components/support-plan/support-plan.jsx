import { memo } from "react";
import { useUserStore } from "@/store";
import "./support-plan.scss";

function SupportPlan() {
  const { userInfo } = useUserStore();

  if (!userInfo) {
    return null;
  }

  return (
    <div className="plan">
      <div className="title">联系人信息</div>
      <div className="bxj">
        <ul>
          <li>姓名</li>
          <li>电话</li>
          <li>家庭住址</li>
        </ul>
        <ul style={{ textAlign: "right" }}>
          <li>{userInfo.name || "未填写"}</li>
          <li>{userInfo.phone || "未填写"}</li>
          <li>{userInfo.address || "未填写"}</li>
        </ul>
      </div>
    </div>
  );
}

export default memo(SupportPlan);
