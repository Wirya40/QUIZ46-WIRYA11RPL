"use client";

import dynamic from "next/dynamic";

// Load AntD sidebar completely client-side
const LayoutWrapper = dynamic(() => import("./LayoutWrapper"), {
  ssr: false,
});

export default function ClientLayoutWrapper({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
