"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({ href, label }) => {
  return (
    <Button variant="link" className="font-normal w-full items-start justify-start p-0" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};