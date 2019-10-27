import React, { useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import UserSection from './UserSection';

const Page = () => {
  const [id, updateId] = useState('1');
  const data = useLazyLoadQuery(
    graphql`
      query PageQuery($id: String) {
        user(id: $id) {
          ...UserSection_user
        }
      }
    `,
    { id },
    { fetchPolicy: 'store-or-network' },
  );
  const toggleUser = () => {
    updateId(id === '1' ? '2' : '1');
  };

  return <UserSection user={data.user} toggleUser={toggleUser} />;
};

export default Page;
