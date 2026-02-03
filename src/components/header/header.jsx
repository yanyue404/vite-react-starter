import { useRef, memo, useState, useEffect } from "react";
import { Toast } from "antd-mobile";
import Banner from "@/components/common/Banner/banner";
import FormRow from "@/components/common/FormRow/FormRow";
import FormInput from "@/components/common/FormInput/FormInput";
import { useUserStore } from "@/store";
import "./header.scss";
import HeadImg from "@/assets/images/head1.png";

function Header() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { userInfo, login, updateUserInfo } = useUserStore();
  const inputRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setPhone(userInfo.phone || "");
      setName(userInfo.name || "");
    }
  }, [userInfo]);

  const data = [
    {
      src: HeadImg,
    },
  ];

  function handleClick() {
    inputRef.current?.focus();
  }

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSubmit = () => {
    console.log("handleSubmit", phone, name);
    if (!phone.trim()) {
      Toast.show({
        content: "请输入手机号",
        position: "top",
      });
      return;
    }

    if (!name.trim()) {
      Toast.show({
        content: "请输入姓名",
        position: "top",
      });
      return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      Toast.show({
        content: "请输入正确的手机号",
        position: "top",
      });
      return;
    }

    if (userInfo) {
      updateUserInfo({ phone, name });
      Toast.show({
        content: "信息更新成功！",
        position: "top",
        icon: "success",
      });
    } else {
      login({
        id: Date.now().toString(),
        name,
        phone,
        address: "",
      });
      Toast.show({
        content: "提交成功！",
        position: "top",
        icon: "success",
      });
    }
  };

  return (
    <>
      <Banner data={data} videoFullScreen="true" bannerHeight="3.43rem" />
      <div className="insure-img">
        <img src="@/assets/images/head2.png" alt="" />
      </div>
      <div className="insure-info">
        <div className="info">
          <div className="message">
            探索精彩内容，填写个人信息！
            <div className="baground"></div>
          </div>
          <FormRow title="姓名" round={true} onAction={() => nameInputRef.current?.focus()}>
            <FormInput ref={nameInputRef} placeholder="请输入姓名" value={name} onChange={handleNameChange} />
          </FormRow>
          <FormRow title="手机号" round={true} onAction={handleClick}>
            <FormInput
              ref={inputRef}
              placeholder="请输入手机号"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11}
              inputMode="numeric"
            />
          </FormRow>
          <div className="apply-btn-wrap">
            <div className="apply-btn" onClick={handleSubmit}>
              <span className="left-g"></span>
              {userInfo ? "更新信息" : "立即提交"}
            </div>
            <span className="right-g"></span>
          </div>
        </div>
        <div className="des">尊敬的用户，您好，无门槛最多优惠12元！</div>
      </div>
    </>
  );
}

export default memo(Header);
