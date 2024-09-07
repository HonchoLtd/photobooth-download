"use client"
import { Suspense } from "react";
import DownloadComponent from "@/components/download";

export default function Home() {


  return (
    <Suspense fallback={<div className="flex justify-center items-center bg-black text-white w-full h-screen">Loading...</div>}>
      <DownloadComponent />
    </Suspense>
  );
}

