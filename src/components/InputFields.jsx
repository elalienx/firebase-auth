// Project files
import InputField from "components/InputField";
import { useUser } from "state/UserProvider";

export default function InputFields({ fields }) {
  // Global state
  const { user, setUser } = useUser();

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setUser({ ...user, ...field });
  }

  // Components
  const InputFields = fields.map((item) => (
    <InputField
      key={item.key}
      options={item}
      state={user[item.key]}
      onChange={onChange}
    />
  ));

  return <>{InputFields}</>;
}
