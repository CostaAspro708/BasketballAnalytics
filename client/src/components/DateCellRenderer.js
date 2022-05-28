export default props => {
    const date = props.data.date.slice(0, 10);
    return (
        <span>
           {date}
        </span>
    );
  }