import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from './userSlice';

const UserCrud = () => {
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateUser({ id: user.id, updates: user }));
      setEditing(false);
    } else {
      dispatch(addUser({ ...user, id: Date.now().toString() }));
    }
    setUser({ id: '', name: '', email: '' });
  };

  const handleEdit = (user) => {
    setUser(user);
    setEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1>User CRUD</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCrud;
