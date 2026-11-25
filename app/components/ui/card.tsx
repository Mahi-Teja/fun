import * as React from "react";

import { cn } from "@/app/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "rounded-[18px] border-[3px] border-[#25243a] bg-white shadow-[7px_7px_0_#25243a] transition-all",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}

export { Card, CardContent };
