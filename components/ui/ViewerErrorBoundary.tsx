'use client';
import { Component, ReactNode } from 'react';

export class ViewerErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center p-4 text-center text-sm text-ink-muted">
          WebGL tidak tersedia di browser ini. Coba browser lain atau aktifkan hardware acceleration.
        </div>
      );
    }
    return this.props.children;
  }
}
