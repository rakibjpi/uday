import { Component, type ErrorInfo } from "react";
import type { BackgroundErrorProps, BackgroundErrorState } from "~/type/Type";

export class BackgroundErrorBoundary extends Component<
  BackgroundErrorProps,
  BackgroundErrorState
> {
  state: BackgroundErrorState = { hasError: false };

  static getDerivedStateFromError(): BackgroundErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Background rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
