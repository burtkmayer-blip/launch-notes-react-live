import React, { useMemo, useState } from "react";
import { Check, Circle, Rocket, Sparkles } from "lucide-react";
import { createRoot } from "react-dom/client";

const h = React.createElement;

const starterTasks = [
  "Sketch the product idea",
  "Create the first screen",
  "Push to GitHub",
  "Deploy to Vercel"
];

function App() {
  const [completed, setCompleted] = useState(["Create the first screen"]);
  const [idea, setIdea] = useState("A tiny launch page for a new project");

  const progress = useMemo(
    () => Math.round((completed.length / starterTasks.length) * 100),
    [completed]
  );

  function toggleTask(task) {
    setCompleted((current) =>
      current.includes(task)
        ? current.filter((item) => item !== task)
        : [...current, task]
    );
  }

  return h(
    "main",
    { className: "app-shell" },
    h(
      "section",
      { className: "workspace", "aria-labelledby": "app-title" },
      h(
        "div",
        { className: "intro" },
        h("div", { className: "intro-icon", "aria-hidden": "true" }, h(Rocket, { size: 28 })),
        h("p", { className: "eyebrow" }, "React starter"),
        h("h1", { id: "app-title" }, "Launch Notes"),
        h(
          "p",
          { className: "lede" },
          "A small, useful React app for shaping an idea into a public first version."
        )
      ),
      h(
        "form",
        { className: "idea-card" },
        h("label", { htmlFor: "idea" }, "Current idea"),
        h("textarea", {
          id: "idea",
          value: idea,
          onChange: (event) => setIdea(event.target.value),
          rows: 4
        })
      ),
      h(
        "section",
        { className: "progress-panel", "aria-label": "Launch progress" },
        h("div", null, h("p", { className: "panel-label" }, "Progress"), h("strong", null, `${progress}%`)),
        h("div", { className: "meter", "aria-hidden": "true" }, h("span", { style: { width: `${progress}%` } }))
      ),
      h(
        "section",
        { className: "task-list", "aria-label": "Launch checklist" },
        starterTasks.map((task) => {
          const isDone = completed.includes(task);

          return h(
            "button",
            {
              className: isDone ? "task is-done" : "task",
              key: task,
              onClick: () => toggleTask(task),
              type: "button"
            },
            h("span", { "aria-hidden": "true" }, isDone ? h(Check) : h(Circle)),
            h("span", null, task)
          );
        })
      ),
      h(
        "aside",
        { className: "note" },
        h(Sparkles, { "aria-hidden": "true" }),
        h(
          "p",
          null,
          "Keep the scope crisp, ship the first useful version, then improve it in public."
        )
      )
    )
  );
}

createRoot(document.getElementById("root")).render(h(App));
