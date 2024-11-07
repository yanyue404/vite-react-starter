import { useState, memo } from "react";
import { useImmer } from "use-immer";
import InfoFillItem from "@/components/common/InfoFillItem/InfoFillItem";
import FormRow from "@/components/common/FormRow/FormRow";
import FormInput from "@/components/common/FormInput/FormInput";
import "./applicat-info.scss";
export default memo(function ApplicantInfo() {
  console.log("applicant-info render.");

  const [applicant, updateApplicant] = useImmer({
    name: "小明",
    certNo: "",
    mobile: "",
  });

  const handleChange = (text, objectKey) => {
    updateApplicant((draft) => {
      draft[objectKey] = text;
    });
  };

  return (
    <div className="index-applicant">
      <InfoFillItem index={2} title="投保人(本人信息)"></InfoFillItem>
      <FormRow title="投保人">
        <FormInput
          value={applicant.name}
          placeholder="请输入投保人姓名"
          onChange={(e) => handleChange(e, "name")}
        ></FormInput>
      </FormRow>
      <FormRow title="身份证号码">
        <FormInput
          value={applicant.certNo}
          placeholder="信息保密，仅用于投保"
          onChange={(e) => handleChange(e, "certNo")}
        ></FormInput>
      </FormRow>
      <FormRow title="手机号">
        <FormInput
          value={applicant.mobile}
          placeholder="手机号为登录的唯一账号"
          onChange={(e) => handleChange(e, "mobile")}
        ></FormInput>
      </FormRow>
      <div> {JSON.stringify(applicant)}</div>
    </div>
  );
});
