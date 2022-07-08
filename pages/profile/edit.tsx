import { NextPage } from 'next';
import Button from 'components/base/Button';
import Layout from 'components/layout';
import Input from 'components/base/Input';
import useUser from 'libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from 'libs/client/useMutation';

interface IEditProfileForm {
  email?: string;
  phone?: string;
  error?: string;
  avatar?: FileList;
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
    watch,
  } = useForm();
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const [avatarPreview, setAvatarPreview] = useState('');

  const avatar = watch('avatar');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]; //브라우저 메모리에 있는 파일
      console.log(file);
      const url = URL.createObjectURL(file); //파일에 접근할수있는 주소 생성
      //blob이 붙은 url은 브라우저의 메모리에만 존재
      console.log(url);

      setAvatarPreview(url);
    }
  }, [avatar]);

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
    if (user?.phone) {
      setValue('phone', user.phone);
    }
    if (user?.avatar) {
      setAvatarPreview(
        `https://imagedelivery.net/mRy7ATe4SHP6RRtnWqHKTQ/${user?.avatar}/avatar`,
      );
    }
  }, [user]);

  useEffect(() => {
    if (data && !data.ok) {
      setError('error', { message: data.error });
    }
  }, [data]);

  const onValid = async ({ email, phone, avatar }: IEditProfileForm) => {
    console.log(avatar);
    if (loading) return;

    if (email === '' && phone === '') {
      return setError('error', {
        message: '이메일, 핸드폰 중 하나는 반드시 입력하세요.',
      });
    }

    if (avatar && avatar.length > 0) {
      const cloudflareRequest = await fetch(`/api/files`);
      const requestResult = await cloudflareRequest.json();

      console.log(requestResult);

      const form = new FormData();
      form.append('file', avatar[0]);
      const fetchResult = await fetch(requestResult.uploadURL, {
        method: 'POST',
        body: form,
      });

      const { result: id } = await fetchResult.json();

      editProfile({
        email,
        phone,
        avatar: id,
      });
      return;
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
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full"
              alt="아바타 미리보기"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register('avatar')}
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
