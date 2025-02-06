import { Twitter, Linkedin, Facebook, Youtube, Instagram } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Facebook, label: "Facebook" },
    { icon: Youtube, label: "YouTube" },
    { icon: Instagram, label: "Instagram" },
  ]

  const legalLinks = [
    "© Siemens 1996 - 2025",
    "Corporate information",
    "Privacy notice",
    "Cookie notice",
    "Terms of use",
    "Digital ID",
    "Whistleblower reporting",
    "Digital Services Act",
  ]

  return (
    <footer className="bg-[#000028] text-white py-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-8 mb-8">
          <div className="text-xl font-bold">SIEMENS</div>
          <div className="text-sm">Xcelerator Marketplace</div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a key={social.label} href="#" className="text-gray-400 hover:text-white transition-colors">
              <social.icon className="h-5 w-5" />
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
          {legalLinks.map((link, index) => (
            <div key={link} className="flex items-center">
              {index > 0 && <span className="mr-4">·</span>}
              <a href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

