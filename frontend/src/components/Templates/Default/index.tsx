import { ReactNode } from "react";
import Bar from "../../Bar";

interface TemplateProps {
  children: ReactNode;
}

export default function DefaultTemplate({ children }: TemplateProps) {
  return (
    <>
      <div>
        <Bar />
        <div className="mt-24 pl-48 relative pr-16">{children}</div>
      </div>
    </>
  );
}
