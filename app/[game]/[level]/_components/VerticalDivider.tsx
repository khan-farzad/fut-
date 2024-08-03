const VerticalDivider = ({
  questionWidth,
  setQuestionWidth,
}: {
  questionWidth: number;
  setQuestionWidth: (neWidth: number) => void;
}) => {
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = questionWidth;

    const handleMouseMove = (e: { clientX: number }) => {
      const newWidth =
        startWidth + ((e.clientX - startX) / window.innerWidth) * 100;
      setQuestionWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className="w-0.5 cursor-ew-resize bg-secondary hover:bg-tertiary"
      onMouseDown={handleMouseDown}
    />
  );
};

export default VerticalDivider;
