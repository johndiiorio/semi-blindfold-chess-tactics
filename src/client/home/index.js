import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../environment';
import Page from './Page';

export default function Home() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query homeQuery($id: String) {
          user(id: $id) {
            ...Page_user
          }
        }
      `}
      variables={{
        // Mock authenticated ID that matches database
        id: 'me',
      }}
      render={({ error, props }) => {
        if (props && props.user) {
          return <Page user={props.user} />;
        } else if (error) {
          return <div>{error.message}</div>;
        }

        return <div>Loading</div>;
      }}
    />
  );
}
