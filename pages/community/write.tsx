import { NextPage } from 'next';
import Layout from 'components/layout';
import TextArea from 'components/base/TextArea';
import Button from 'components/base/Button';

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4">
        <TextArea required placeholder="Ask a question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
