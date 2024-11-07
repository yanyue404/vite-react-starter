import { useEffect } from "react";
import { Footer, SafeArea } from "antd-mobile";
import useSWR from "swr";
import axios from "axios";
import Header from "@/components/header/header";
import SupportPlan from "@/components/support-plan/support-plan";
import Segment from "@/components/common/Segment/Segment";
import Product from "@/components/product/product";
import "./home.scss";
import { GET } from "@/provider/http";
import { useDemo } from "@/hook/useDemo";
export default function Home() {
  // useEffect(() => {
  //   console.log("接口请求！");
  //   GET("/api/search/repositories?q=javascript&sort=stars");
  // }, []);
  const fetcher = GET;
  const { data, error, isLoading } = useSWR("/api/search/repositories?q=javascript&sort=stars", fetcher);

  return (
    <>
      <Header></Header>
      <SupportPlan></SupportPlan>
      <Segment></Segment>
      <Product></Product>
      {useDemo()}
      <Footer label={"@github-javascript-repos:" + data?.total_count}></Footer>
      <SafeArea position="bottom" />
    </>
  );
}
