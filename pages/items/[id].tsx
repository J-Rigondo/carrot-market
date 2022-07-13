import React, { useMemo } from 'react';
import { NextPage } from 'next';
import Layout from 'components/layout';
import Button from 'components/base/Button';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { Product } from '@prisma/client';
import Link from 'next/link';
import useMutation from 'libs/client/useMutation';
import { cls } from 'libs/client/utils';
import Image from 'next/image';

interface ProductWithUser extends Product {
  user: IUser;
}

interface IUser {
  id: number;
  name: string;
  avatar?: string;
}

interface IItemDetail {
  ok: boolean;
  item: ProductWithUser; //Product & { user: { id: number; name: string } };
  relatedItems: ProductWithUser[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data, mutate } = useSWR<IItemDetail>(id ? `/api/items/${id}` : null);
  console.log(data);

  const [toggleFav, { data: mutateResut }] = useMutation(
    `/api/items/${id}/fav`,
  );
  const onFavClick = () => {
    toggleFav({});

    if (!data) return;

    mutate({ ...data, isLiked: !data.isLiked }, false); //opts-> 재조회 여부
  };

  return (
    <Layout canGoBack seoTitle="Product Detail">
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/mRy7ATe4SHP6RRtnWqHKTQ/${data?.item.imageUrl}/public`}
              className="object-cover"
              layout="fill"
            />
          </div>

          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/mRy7ATe4SHP6RRtnWqHKTQ/${data?.item.user.avatar}/public`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.item?.user?.name}
              </p>
              <Link href="/profile/edit">
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.item.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.item.price}
            </span>
            <p className=" my-6 text-gray-700">{data?.item.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  'p-3 rounded-md flex items-center hover:bg-gray-100 justify-center hover:bg-gray-100 ',
                  data?.isLiked
                    ? 'text-red-400 hover:text-red-500'
                    : 'text-gray-400 hover:text-gray-500',
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedItems?.map((item) => (
              <div key={item.id}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">{item.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
