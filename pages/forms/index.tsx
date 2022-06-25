import { FieldErrors, useForm } from 'react-hook-form';

interface ILoginForm {
  username: string;
  email: string;
  password: string;
}

const Forms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({ mode: 'onBlur' });

  const onValid = () => {
    console.log('success');
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="p-4 flex space-x-2"
    >
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="username"
          {...register('username', {
            required: 'username is required',
            minLength: { value: 5, message: 'mininum length is 5' },
          })}
        />
        <span className="text-red-500">{errors.username?.message}</span>
      </div>

      <div className="flex flex-col">
        <input
          type="email"
          placeholder="email"
          {...register('email', {
            required: 'email is required',
            validate: {
              notGmail: (value) => !value.includes('@gmail') || 'gmail invalid',
            },
          })}
        />
        <span className="text-red-500">{errors.email?.message}</span>
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: 'password is required' })}
        />
        <span className="text-red-500">{errors.password?.message}</span>
      </div>

      <input
        className="ml-2 rounded-full p-2 border-orange-500 ring-orange-500 border-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        type="submit"
        value="create account"
      />
    </form>
  );
};

export default Forms;
