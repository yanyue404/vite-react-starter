import { useRef, memo } from "react";
import Banner from "@/components/common/Banner/banner";
import FormRow from "@/components/common/FormRow/FormRow";
import FormInput from "@/components/common/FormInput/FormInput";
import "./header.scss";
import HeadImg from "@/assets/images/head1.png";
export default memo(function Header() {
  console.log("header render.");
  const data = [
    {
      src: HeadImg,
    },
  ];
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }

  const handlerChange = () => {};
  return (
    <>
      <Banner data={data} videoFullScreen="true" bannerHeight="3.43rem"></Banner>
      <div className="insure-img">
        <img src="@/assets/images/head2.png" alt="" />
      </div>
      <div className="insure-info">
        <div className="info">
          <div className="message">
            探索精彩内容，填写手机号！
            <div className="baground"></div>
          </div>
          <FormRow title="手机号" round={true} onAction={handleClick}>
            <FormInput ref={inputRef} placeholder="请输入手机号" onChange={(e) => handlerChange} />
          </FormRow>
          <div className="apply-btn-wrap">
            <div className="apply-btn">
              <span className="left-g"></span>
              立即提交
            </div>
            <span className="right-g"></span>
          </div>
        </div>
        <div className="des">尊敬的用户，您好，无门槛最多优惠12元！</div>
      </div>
    </>
  );
});
