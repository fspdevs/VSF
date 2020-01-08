import React, { useState, useReducer, useEffect } from 'react';

const ClientItem = props => {
  //   const [editMode, setEditMode] = useState(false);
  //   const [clientInfo, updateClientInfo] = useReducer(
  //     (state, newState) => ({ ...state, ...newState }),
  //     {
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       phone: '',
  //       editMode: false,
  //     },
  //   );

  //   useEffect(() => {
  //     console.log(props.client, 'client');
  //   }, []);

  //   const { firstName, lastName, email, phone, editMode } = clientInfo;
  const { client, authUser } = props;
  return (
    <div>
      <span>
        <strong>{client.firstName}</strong>
      </span>
      <span>
        <strong>{client.lastName}</strong>
      </span>
      <span>
        <strong>{client.email}</strong>
      </span>
      <span>
        <strong>{client.phone}</strong>
      </span>
    </div>
  );
};
export default ClientItem;
