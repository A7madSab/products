export function MainNav() {
  const navItems = [
    "Xcelerator Marketplace",
    "Products & Solutions",
    "Industries",
    "Topics",
    "API World",
    "Community",
    "Learning Hub",
    "Ecosystem",
  ];

  return (
    <nav className="text-white border-t border-gray-800">
      <div className="container mx-auto">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`border-b-2 block my-2 py-2 text-sm hover:text-[#00fab5] transition-colors ${
                  item === "Products & Solutions"
                    ? "border-[#00fab5]"
                    : "border-transparent"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
