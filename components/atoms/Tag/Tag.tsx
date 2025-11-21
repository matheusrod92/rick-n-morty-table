import "./Tag.css";

export interface TagProps {
  status: string;
};

export function Tag({ status }: TagProps) {
  return (
    <span className={`tag tag--${status.toLowerCase()}`}>
      {status}
    </span>
  );
}