# FlipCountdown 组件

`FlipCountdown` 是一个用于显示翻转倒计时的 React 组件。它可以根据给定的持续时间 (`duration`) 或目标日期 (`targetDate`) 计算倒计时，并在倒计时结束时调用 `onEnded` 回调函数。



## 使用示例

### 基本用法

```tsx
import React from 'react';
import FlipCountdown from './components/flip-countdown';

const App = () => {
  const handleCountdownEnd = () => {
    alert('Countdown ended!');
  };

  return (
    <div>
      <FlipCountdown
        duration={1000 * 60 * 5} // 5 minutes
        type="Minute"
        onEnded={handleCountdownEnd}
      />
    </div>
  );
};

export default App;
```

### 使用目标日期

```tsx
import React from 'react';
import FlipCountdown from './components/flip-countdown';

const App = () => {
  const handleCountdownEnd = () => {
    alert('Countdown ended!');
  };

  return (
    <div>
      <FlipCountdown
        targetDate={new Date('2023-12-31T23:59:59')}
        type="Day"
        onEnded={handleCountdownEnd}
      />
    </div>
  );
};

export default App;
```

## 属性

| 属性       | 类型               | 默认值   | 必填                                                         | 描述                                                                 |
|------------|--------------------|----------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| `duration` | `number`           | `undefined` | ❌ | 倒计时的持续时间（以毫秒为单位）。如果设置了 `targetDate`，则此属性无效。 |
| `type`     | `"Day" | "Hour" | "Minute" | "Second"` | `"Day"` | ❌                         | 倒计时的类型。根据类型显示不同的时间单位。                          |
| `targetDate` | `Date`             | `undefined` | ❌                          | 目标时刻。                           |
| `onEnded`  | `() => void`       | `undefined` | ❌                                             | 倒计时结束时的回调函数。                                              |

## 注意事项

- `duration` 和 `targetDate` 同时只能有一个属性生效，当两个属性都传值时，以 `targetDate` 为准。
- 如果都不传 `duration` 和 `targetDate`，默认倒计时 5 分钟。

## 样式

`FlipCountdown` 组件使用了 `clsx` 和自定义样式模块 `index.module.less`。你可以根据需要自定义样式。

## 依赖

- `react`
- `react-dom`
- `dayjs`
- `clsx`

## 贡献

欢迎贡献代码和提出问题！

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

希望这份文档对你有帮助！如果有任何问题或需要进一步的帮助，请随时提问。