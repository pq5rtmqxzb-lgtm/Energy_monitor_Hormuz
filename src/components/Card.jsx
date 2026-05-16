export function Card({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={`bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHeader({ icon: Icon, iconClass = "text-amber-400", title, children }) {
  return (
    <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
      {Icon && <Icon size={16} className={iconClass} />}
      <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
