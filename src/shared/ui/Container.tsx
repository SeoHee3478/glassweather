import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 p-8 ${className}`}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
};
