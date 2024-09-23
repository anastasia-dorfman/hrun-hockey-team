import FormRow from "../FormRow";

const NameForm = ({ fullName, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...fullName, [name]: value });
  };

  return (
    <div className="name-form">
      <div className="form-row-inline name">
        <FormRow
          type="text"
          name="firstName"
          placeholder="First Name"
          value={fullName.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <FormRow
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={fullName.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>
    </div>
  );
};

export default NameForm;
