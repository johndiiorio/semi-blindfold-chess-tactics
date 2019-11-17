import React, { useTransition } from 'react';
import { useFragment } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';

const UserSection = props => {
  const user = useFragment(
    graphql`
      fragment UserSection_user on User @refetchable(queryName: "UserSectionRefetchQuery") {
        username
      }
    `,
    props.user,
  );
  const [startTransition] = useTransition({ timeoutMs: 500 });

  let info = null;
  if (user && user.username) {
    info = <div>{user.username}</div>;
  }

  const onClick = () => {
    startTransition(() => {
      // TODO update user? How?
    });
  };

  return (
    <div>
      {info}
      <Button onClick={onClick}>Toggle user</Button>
    </div>
  );
};

export default UserSection;
