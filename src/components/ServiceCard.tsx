import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  contain?: boolean;
  onClick: () => void;
}

function ServiceCard({ title, description, image, contain, onClick }: ServiceCardProps) {
  return (
    <button type="button" className="group lc-card studio-plate" onClick={onClick}>
      <span className="studio-plate__image">
        <img src={image} alt="" loading="lazy" className={contain ? 'is-speaker' : undefined} />
      </span>
      <span className="studio-plate__body">
        <strong>{title}</strong>
        <span>{description}</span>
        <span className="studio-explore">Explore <ArrowUpRight aria-hidden="true" size={15} /></span>
      </span>
    </button>
  );
}

export default ServiceCard;
