import React from 'react';
import ClientItem from './ClientItem';

const ClientList = ({ clients, authUser }) => {
  return (
    <>
      <div>
        <ul>
          {clients.map(client => (
            <ClientItem
              authUser={authUser}
              client={client}
              key={client.uid}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClientList;
