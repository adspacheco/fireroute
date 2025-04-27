"use client";
import dynamic from "next/dynamic";
import { MapProps } from "./map";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => <Skeleton className="h-[400px] w-full rounded-lg" />;

const Map = dynamic(() => import("./map").then((mod) => mod.Map), {
  loading: () => <Loading />,
  ssr: false,
});

export const DynamicMap = (props: MapProps) => <Map {...props} />;
