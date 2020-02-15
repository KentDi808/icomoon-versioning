import React from 'react';
import PropTypes from 'prop-types';

function UsersList (props) {
  const { data } = props;

  function renderHeader () {
    return (
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    );
  }

  function renderUsers () {
    return data.map((user) => {
      return (
        <tr key={ user.id }>
          <td>{ user.name }</td>
          <td>{ user.email }</td>
          <td>{ user.phone }</td>
        </tr>
      );
    });
  }

  return (
    <table>
      <thead>
        { renderHeader() }
      </thead>
      <tbody>
        { renderUsers() }
      </tbody>
    </table>
  );
}

UsersList.propTypes = {
  data: PropTypes.array,
};

export default UsersList;
