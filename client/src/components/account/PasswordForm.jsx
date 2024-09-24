import FormRow from "../shared/FormRow";

const PasswordForm = ({ passwordObject, onChange, errors }) => {
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
      <div className="form-row-inline">
        <FormRow
          type="password"
          name="password"
          placeholder="New Password"
          value={passwordObject.password || ""}
          onChange={handleChange}
          error={errors.password}
        />
        <FormRow
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={passwordObject.passwordConfirmation || ""}
          onChange={handleChange}
          error={errors.passwordConfirmation}
        />
      </div>
    </div>
  );
};

export default PasswordForm;
