import { ReactNode } from "react";
import { Button } from "../../../components";

interface ButtonListProps<T> {
  items: T[];
  selectedIndex: number | null;
  onItemClick: (index: number, item: T) => void;
  renderLabel?: (item: T, index: number) => ReactNode;
}

const ButtonList = <T,>({
  items,
  selectedIndex,
  onItemClick,
  renderLabel,
}: ButtonListProps<T>) => {
  const getLabel = (item: T, index: number): ReactNode => {
    if (renderLabel) {
      return renderLabel(item, index);
    }
    return String(item);
  };

  return (
    <>
      {items.map((item, index) => (
        <Button
          key={index}
          variant={selectedIndex === index ? "primary" : "secondary"}
          fullWidth
          onClick={() => onItemClick(index, item)}
          disabled={selectedIndex !== null && selectedIndex !== index}
        >
          {getLabel(item, index)}
        </Button>
      ))}
    </>
  );
};

export default ButtonList;
