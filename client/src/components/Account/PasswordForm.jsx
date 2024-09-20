import FormRow from "../FormRow";

const PasswordForm = ({ passwordObject, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...passwordObject,
      [name]: value,
    });
  };

  return (
    <div className="password-form">
      <FormRow
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={passwordObject.currentPassword || ""}
        onChange={handleChange}
      />
      <div className="form-row-inline name">
        <FormRow
          type="password"
          name="password"
          placeholder="New Password"
          value={passwordObject.password || ""}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={passwordObject.passwordConfirmation || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PasswordForm;