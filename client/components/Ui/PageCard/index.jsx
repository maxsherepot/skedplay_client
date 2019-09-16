function PageCard({ children }) {
  return (
    <div className="fluid-container">
      <div className="bg-white rounded shadow">{children}</div>
    </div>
  );
}

export default PageCard;
