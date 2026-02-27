export function SectionHeader({ id, title, tag, description, children }) {
  return (
    <header className="section__header">
      <h2 className="section__header-title h1" id={id}>
        {title}
      </h2>
      <span className="section__header-tag">{tag}</span>
      {description && (
        <p className="section__header-description">{description}</p>
      )}
      {children}
    </header>
  );
}
