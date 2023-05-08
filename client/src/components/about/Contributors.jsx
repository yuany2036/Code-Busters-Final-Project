
const Contributors = ({ h3, role, p, recommendation1, recommendation2 }) => {
  return (
    <div>
      <h3>{h3}</h3>
      <p>{role}</p>
      <p>{p}</p>
      <p>{recommendation1}</p>
      <p>{recommendation2}</p>
    </div>
  );
};

export default Contributors;
