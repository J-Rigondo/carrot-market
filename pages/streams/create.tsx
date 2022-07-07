import { NextPage } from 'next';
import Layout from 'components/layout';
import Input from 'components/base/Input';
import TextArea from 'components/base/TextArea';
import Button from 'components/base/Button';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream, Message } from '@prisma/client';

interface ICreateForm {
  name: string;
  description: string;
  price: string;
}

interface ICreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ICreateForm>();
  const [createStream, { loading, data }] =
    useMutation<ICreateResponse>(`/api/streams`);

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data]);

  const onValid = (form: ICreateForm) => {
    if (loading) return;
    createStream(form);
  };

  return (
    <Layout canGoBack title="Go Live">
      <form className=" space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('name')}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register('price', { valueAsNumber: true })}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register('description')}
          name="description"
          label="Description"
        />
        <Button text={loading ? 'Loading...' : 'Go Stream'} />
      </form>
    </Layout>
  );
};

export default Create;
