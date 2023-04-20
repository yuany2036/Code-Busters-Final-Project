
const Contributors = ({ h3, role, p, recommendation }) => {
  return (
    <div>
      <h3>{h3}</h3>
      <p>{role}</p>
      <p>{p}</p>
      <p>{recommendation}</p>
    </div>
  );
};

export default Contributors;
