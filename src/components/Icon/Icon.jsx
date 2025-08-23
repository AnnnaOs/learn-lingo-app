const Icon = ({ name, className }) => (
  <svg className={className} aria-hidden="true">
    <use href={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
