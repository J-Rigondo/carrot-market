import Layout from 'components/layout';
import { NextPage } from 'next';
import Message from 'components/base/Message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import useUser from 'libs/client/useUser';
import { useEffect } from 'react';

interface IMessage {
  message: string;
  id: number;
  user: {
    id: number;
    avatar?: string;
  };
}

interface IStream extends Stream {
  messages: IMessage[];
}

interface IStreamResponse {
  ok: true;
  stream: IStream;
}

interface IMessageForm {
  message: string;
}

const StreamPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<IStreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    { refreshInterval: 3000 },
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/message`,
  );
  const { register, handleSubmit, reset } = useForm<IMessageForm>();

  // useEffect(() => {
  //   if (sendMessageData && sendMessageData.ok) {
  //     mutate();
  //   }
  // }, [sendMessageData, mutate]);

  const onValid = (form: IMessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        (prev && {
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  id: user?.id,
                  avatar: user?.avatar,
                },
              },
            ],
          },
        }) as any,
      false,
    );
    //sendMessage(form);
  };

  return (
    <Layout canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              className="flex relative max-w-md items-center  w-full mx-auto"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                type="text"
                {...register('message', { required: true })}
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamPage;
