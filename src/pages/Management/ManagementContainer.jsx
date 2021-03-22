import React, { useCallback, useEffect, useState } from 'react';
import { Management } from './Management';

import { managementService } from '../../services/management';

export const ManagementContainer = () => {
  const [users, setUsers] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isRemovingUser, setIsRemovingUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const users = await managementService.getUsers();
      setUsers(users);
    };

    fetchData();
  }, [setUsers]);

  const handleCreate = useCallback(
    (userData) => {
      const createUser = async () => {
        setIsCreatingUser(true);
        await managementService.createJudge(userData);
        setIsCreatingUser(false);
      };

      createUser();
    },
    [setIsCreatingUser],
  );

  const handleDelete = useCallback(
    (id) => {
      const deleteUser = async () => {
        setIsRemovingUser(true);
        await managementService.removeJudge(id);
        setUsers(await managementService.getUsers());
        setIsRemovingUser(false);
      };

      deleteUser();
    },
    [setIsRemovingUser, setUsers],
  );

  return (
    <Management
      users={users}
      onCreate={handleCreate}
      isCreatingUser={isCreatingUser}
      isRemovingUser={isRemovingUser}
      onDelete={handleDelete}
    />
  );
};
