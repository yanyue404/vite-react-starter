import { useState } from "react";
import { Button, Tag } from "antd-mobile";
import { useBearStore } from "@/store";
import VideoPlayer from "@/components/common/video-player/video-player";
import flower from "@/assets/files/flower.mp4";
import "./product.scss";

export default function Product() {
  const arr = [
    "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
    "https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg",
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const { bears, increasePopulation } = useBearStore();

  const OnClickPlay = () => {
    setIsPlaying(!isPlaying);
    isPlaying && increasePopulation();
  };
  return (
    <div className="detail">
      <div className="title-nav">
        <i className="title-left"></i>
        <strong>视图资源</strong>
        <i className="title-right"></i>
      </div>
      <Button color="success" fill="outline" onClick={OnClickPlay}>
        {isPlaying ? "暂停" : "播放"} {!isPlaying && bears > 0 ? <Tag>{bears}次</Tag> : ""}
      </Button>
      <VideoPlayer isPlaying={isPlaying} src={flower} />
      {arr.map((item) => {
        return <img src={item} key={item} />;
      })}
    </div>
  );
}
