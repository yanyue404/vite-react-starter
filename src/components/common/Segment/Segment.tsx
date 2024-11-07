import React, { useEffect, useState } from "react";
import { Tabs } from "antd-mobile";
import "./Segment.scss";
import { useThrottleFn } from "ahooks";
import { faker } from "@faker-js/faker";

const tabItems = [
  { key: "1", title: "第一项", text: faker.lorem.lines(8) },
  { key: "2", title: "第二项", text: faker.lorem.lines(8) },
  { key: "3", title: "第三项", text: faker.lorem.lines(8) },
  { key: "4", title: "第四项", text: faker.lorem.lines(8) },
];

const tabHeight = 50;

export default function Segment() {
  const [activeKey, setActiveKey] = useState("1");

  const { run: handleScroll } = useThrottleFn(
    () => {
      let currentKey = tabItems[0].key;
      for (const item of tabItems) {
        const element = document.getElementById(`anchor-${item.key}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();

        if (rect.top <= tabHeight) {
          currentKey = item.key;
        } else {
          break;
        }
      }
      console.log("currentKey", currentKey);

      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="tabsContainer">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            console.log("key", key);

            document.getElementById(`anchor-${key}`)?.scrollIntoView();
            window.scrollTo({
              top: window.scrollY - 48,
            });
          }}
        >
          {tabItems.map((item) => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="content">
        {tabItems.map((item) => (
          <div key={item.key}>
            <h2 id={`anchor-${item.key}`}>{item.title}</h2>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
}
