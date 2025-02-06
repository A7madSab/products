import { Search, Globe, Mail, ShoppingCart, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopBar() {
  return (
    <div className="bg-[#000033] text-white">
      <div className="container mx-auto flex items-center justify-between py-3">
        <a href="/" className="text-xl font-bold">
          SIEMENS
        </a>

        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search"
              className="bg-[#001147] border-0 text-white placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Global</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

