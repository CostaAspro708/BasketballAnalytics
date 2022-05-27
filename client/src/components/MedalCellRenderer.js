export default props => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  return (
      <span>
         <a href={props.data.id}>{props.data.name}</a>
      </span>
  );
}