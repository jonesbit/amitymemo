import { ReactNode } from "react";

interface CreateLayoutProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: CreateLayoutProps) {
  return (
    <main className="create-container">
      {children}
    </main>
  );
}