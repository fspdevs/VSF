import React from 'react';
import ClientItem from './ClientItem';

const ClientList = ({
  clients,
  authUser,
  onEditClient,
  onRemoveClient,
}) => {
  return (
    <div>
      <ul>
        {clients.map(client => (
          <ClientItem
            authUser={authUser}
            key={client.uid}
            client={client}
            onEditClient={onEditClient}
            onRemoveClient={onRemoveClient}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
