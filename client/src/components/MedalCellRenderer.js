export default props => {
  const link = props.data.id.slice(0, -5);
  return (
      <span>
         <a className="text-blue-800" href={link}>{props.data.name}</a>
      </span>
  );
}