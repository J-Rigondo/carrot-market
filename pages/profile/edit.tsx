import { NextPage } from 'next';
import Button from 'components/base/Button';
import Layout from 'components/layout';
import Input from 'components/base/Input';
import useUser from 'libs/client/useUser';
import { ErrorOption, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useMutation from 'libs/client/useMutation';

interface IEditProfileForm {
  email?: string;
  phone?: string;
  error?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  console.log(data);

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
    if (user?.phone) {
      setValue('phone', user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (data && !data.ok) {
      setError('error', { message: data.error });
    }
  }, [data]);

  const onValid = ({ email, phone }: IEditProfileForm) => {
    if (loading) return;

    if (email === '' && phone === '') {
      return setError('error', {
        message: '이메일, 핸드폰 중 하나는 반드시 입력하세요.',
      });
    }

    editProfile({
      email,
      phone,
    });
  };
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="py-10 px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('email')}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register('phone')}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.error ? (
          <span className="my-2 font-bold block text-red-500">
            {errors.error.message as string}
          </span>
        ) : null}
        <Button text={loading ? 'Loading...' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default Edit;
