import { useState } from "react";
import { Button, Tag, Card, Grid } from "antd-mobile";
import { useBearStore, useProductStore } from "@/store";
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
  const { products, selectProduct, toggleFavorite, isFavorite } = useProductStore();

  const OnClickPlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      increasePopulation();
    }
  };

  const handleProductClick = (product) => {
    selectProduct(product);
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
      <div style={{ marginTop: "16px" }}>
        {arr.map((item) => {
          return <img src={item} key={item} alt="展示图片" style={{ width: "100%", marginBottom: "8px" }} />;
        })}
      </div>
      {products.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <div className="title-nav" style={{ marginBottom: "16px" }}>
            <i className="title-left"></i>
            <strong>推荐产品</strong>
            <i className="title-right"></i>
          </div>
          <Grid columns={2} gap={8}>
            {products.map((product) => (
              <Grid.Item key={product.id}>
                <Card
                  title={product.name}
                  extra={
                    <Button
                      size="mini"
                      color={isFavorite(product.id) ? "danger" : "default"}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {isFavorite(product.id) ? "已收藏" : "收藏"}
                    </Button>
                  }
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>¥{product.price}</div>
                  </div>
                </Card>
              </Grid.Item>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
