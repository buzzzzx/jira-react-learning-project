import React, { PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  constructor(props: PropsWithChildren<{ fallbackRender: FallbackRender }>) {
    super(props);
    this.state = { error: null };
  }

  // 当子组件抛出异常，会被这里接收到，error 会被更新到 state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      fallbackRender({ error });
    } else {
      return children;
    }
  }
}
