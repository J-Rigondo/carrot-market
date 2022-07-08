import Layout from 'components/layout';
import { NextPage } from 'next';
import Button from 'components/base/Button';
import TextArea from 'components/base/TextArea';
import Input from 'components/base/Input';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IUploadForm {
  name: string;
  price: string;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  item: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<IUploadForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>('/api/items');

  const onValid = async (data: IUploadForm) => {
    console.log('onvalid', loading);
    if (loading) return; //prevent repetitive click

    if (data.photo && data.photo.length > 0) {
      const request = await fetch(`/api/files`);
      const response = await request.json();

      const form = new FormData();
      form.append('file', data.photo[0]);

      const fetchResult = await fetch(response.uploadURL, {
        method: 'POST',
        body: form,
      });

      console.log(fetchResult);

      const {
        result: { id: imageId },
        result,
      } = await fetchResult.json();

      console.log(result);

      uploadProduct({
        name: data.name,
        price: data.price,
        description: data.description,
        photoId: imageId,
      });
    }
  };

  const [photoPreview, setPhotoPreview] = useState('');

  const watchAvatar = watch('photo');

  useEffect(() => {
    if (watchAvatar && watchAvatar.length > 0) {
      const url = URL.createObjectURL(watchAvatar[0]);
      setPhotoPreview(url);
      console.log(watchAvatar);
      console.log(url);
    }
  }, [watchAvatar]);

  useEffect(() => {
    if (data?.ok) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Upload Product">
      <form
        className="p-4 space-y-4"
        onSubmit={handleSubmit(onValid, (e) => console.log(e))}
      >
        <input
          {...register('photo', { required: true })}
          id="photo"
          className="hidden"
          type="file"
          accept="image/*"
        />
        {photoPreview ? (
          <label htmlFor="photo" className="cursor-pointer">
            <img src={photoPreview} className="aspect-video" />
          </label>
        ) : (
          <div>
            <label
              htmlFor="photo"
              className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md"
            >
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
        )}
        <Input
          register={register('name', { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register('price', { required: true })}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? 'Loading...' : 'Upload item'} />
      </form>
    </Layout>
  );
};

export default Upload;
