import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const Page = ({ user }) => {
  return <div>Num todos: {user.totalCount}</div>;
};

export default createFragmentContainer(Page, {
  user: graphql`
    fragment Page_user on User {
      id
      username
      rating
    }
  `,
});
