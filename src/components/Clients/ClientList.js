import React from 'react';
import ClientItem from './ClientItem';

const ClientList = ({ clients, authUser }) => {
  return (
    <div style={{ width: '200px', backgroundColor: 'magenta' }}>
      <ul>
        {clients.map(client => (
          <ClientItem
            authUser={authUser}
            client={client}
            key={client.uid}
          />
        ))}
        <h2>HELOOO</h2>
      </ul>
    </div>
  );
};

export default ClientList;
