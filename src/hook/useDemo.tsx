import { useState, useEffect } from "react";
export function useDemo() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("组件更新");
    return () => {
      console.log("组件卸载");
    };
  }, [count]);

  // React 的 Hooks 主要是用于维护组件的状态、处理副作用等，但你可以通过 Hooks 返回 JSX 内容。虽然在 Hooks 中不直接返回 JSX，而是通常在组件内使用 Hooks 然后返回 JSX。
  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
}
