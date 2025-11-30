import "./Card.css";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className="ui-card">{children}</div>;
};

export default Card;
