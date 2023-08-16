export const SectionHeader = ({ children, size }) => {
  return (
    <div className="section-header">
      <p
        className={
          size === "sm"
            ? "sm"
            : size === "md"
            ? "md"
            : size === "lg"
            ? "lg"
            : ""
        }
      >
        {children}
      </p>
    </div>
  );
};
