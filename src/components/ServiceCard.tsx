import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
}

function ServiceCard({ icon: Icon, title, description, gradient, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-gray-800 p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      {Icon && (
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      )}

      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex items-center text-cyan-400 font-semibold">
        <span>Explore</span>
        <svg
          className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </button>
  );
}

export default ServiceCard;
