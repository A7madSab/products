import { Home } from "lucide-react";

export function Breadcrumb() {
  return (
    <div className="text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm">
          <Home className="h-4 w-4" color="#00fab5" />
          <span className="text-gray-400">{">"}</span>
          <span>Products & Solutions</span>
        </div>
      </div>
    </div>
  );
}
