import { useEffect } from "react";
import { Footer, SafeArea, SpinLoading, Toast } from "antd-mobile";
import useSWR from "swr";
import Header from "@/components/header/header";
import SupportPlan from "@/components/support-plan/support-plan";
import Segment from "@/components/common/Segment/Segment";
import Product from "@/components/product/product";
import "./home.scss";
import { GET } from "@/provider/http";
import { useUserStore, useAppStore, useProductStore } from "@/store";
import { useDemo } from "@/hook/useDemo";

// 初始化示例产品数据
const initSampleProducts = (setProducts) => {
  const sampleProducts = [
    {
      id: "1",
      name: "智能手机",
      price: 2999,
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
      description: "高性能智能手机，拍照清晰，运行流畅",
      category: "电子产品",
    },
    {
      id: "2",
      name: "笔记本电脑",
      price: 5999,
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg",
      description: "轻薄便携，性能强劲，适合办公和娱乐",
      category: "电子产品",
    },
    {
      id: "3",
      name: "无线耳机",
      price: 299,
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
      description: "降噪效果好，音质清晰，续航持久",
      category: "音频设备",
    },
    {
      id: "4",
      name: "智能手表",
      price: 1299,
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg",
      description: "健康监测，运动追踪，时尚设计",
      category: "智能穿戴",
    },
  ];
  setProducts(sampleProducts);
};

export default function Home() {
  const { userInfo, isLoggedIn } = useUserStore();
  const { setLoading } = useAppStore();
  const { products, setProducts } = useProductStore();
  const fetcher = GET;
  const { data, error, isLoading } = useSWR("/api/search/repositories?q=javascript&sort=stars", fetcher);

  // 初始化示例产品数据（仅在首次加载时）
  useEffect(() => {
    if (products.length === 0) {
      initSampleProducts(setProducts);
    }
  }, [products.length, setProducts]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (error) {
      Toast.show({
        content: "数据加载失败，请稍后重试",
        position: "top",
      });
    }
  }, [error]);

  return (
    <>
      <Header />
      {isLoggedIn && userInfo && <SupportPlan />}
      <Segment />
      <Product />
      <div style={{ padding: "16px" }}>{useDemo()}</div>
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <SpinLoading style={{ "--size": "24px" }} />
        </div>
      )}
      <Footer label={data?.total_count ? `GitHub JavaScript 仓库: ${data.total_count} 个` : "加载中..."} />
      <SafeArea position="bottom" />
    </>
  );
}
