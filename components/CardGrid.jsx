import React from "react";
import Card from "./Card";

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
      <Card 
        title="🚀 Unified Dev Server" 
        desc="Run React & Express together with zero CORS issues." 
        icon="⚡"
      />
      <Card 
        title="🎨 Tailwind Built-in" 
        desc="Pre-configured TailwindCSS for rapid UI prototyping." 
        icon="🎨"
      />
      <Card 
        title="📦 One Node Modules" 
        desc="No separate installs — single dependency management." 
        icon="📦"
      />
      <Card 
        title="🛠 Scalable Setup" 
        desc="Organized routes, models, and views out of the box." 
        icon="🛠"
      />
      <Card 
        title="⚡ Hot Reload" 
        desc="Instant changes across client & server without restarts." 
        icon="🔥"
      />
      <Card 
        title="🌍 API First" 
        desc="REST APIs structured with versioning and best practices." 
        icon="🌍"
      />
    </div>
  );
}
