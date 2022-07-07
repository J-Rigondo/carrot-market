import { NextPage } from 'next';
import Layout from 'components/layout';
import TextArea from 'components/base/TextArea';
import Button from 'components/base/Button';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCoords from 'libs/client/useCoords';

interface IWriteForm {
  question: string;
}

interface IWriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  const { register, handleSubmit, reset } = useForm<IWriteForm>();
  const [post, { loading, data }] = useMutation('/api/posts');
  console.log('lat long', latitude, longitude);

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data]);

  const onValid = (data: IWriteForm) => {
    if (loading) return;

    post({ ...data, latitude, longitude });
    reset();
  };

  const onFail = (data: any) => {
    console.log(data);
  };

  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid, onFail)}>
        <TextArea
          register={register('question', {
            required: true,
            minLength: 3,
          })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? 'Loading...' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
