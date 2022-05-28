export default props => {
  const link = props.data.id.slice(0, -5);
  return (
      <span>
         <a href={link}>{props.data.name}</a>
      </span>
  );
}