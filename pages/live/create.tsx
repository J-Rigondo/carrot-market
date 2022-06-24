import { NextPage } from 'next';
import Layout from 'components/layout';
import Input from 'components/base/Input';
import TextArea from 'components/base/TextArea';
import Button from 'components/base/Button';

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className=" space-y-4 py-10 px-4">
        <Input required label="Name" name="name" type="text" />
        <Input
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea name="description" label="Description" />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
