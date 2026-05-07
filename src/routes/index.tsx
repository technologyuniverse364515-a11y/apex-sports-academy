import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Apex Sports Academy — Train Like a Champion" },
      {
        name: "description",
        content:
          "Premier sports academy offering professional coaching in cricket, football, tennis & more. Join now and train like a champion.",
      },
    ],
  }),
});

function Index() {
  // Redirect to the static, config-driven sports club site living in /public/sportsclub
  useEffect(() => {
    window.location.replace("sportsclub/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">
        Loading Apex Sports Academy…{" "}
        <a href="sportsclub/index.html" className="text-primary underline">
          Continue
        </a>
      </p>
    </div>
  );
}
