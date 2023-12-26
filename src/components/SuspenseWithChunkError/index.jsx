import React, { Component, Suspense } from "react";

export class SuspenseWithChunkError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    const { hasError } = this.state;
    const { fallback } = this.props;
    if (hasError) {
      return fallback;
    }
    return <Suspense {...this.props} />;
  }
}

export default SuspenseWithChunkError;
