import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
  mutation register(
    $account_type: String!
    $club_type: String
    $first_name: String!
    $phone: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      input: {
        account_type: $account_type
        club_type: $club_type
        first_name: $first_name
        phone: $phone
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      access_token
      user {
        id
        first_name
      }
    }
  }
`;

const Home = () => (
    <div>Home page</div>
)

// const Home = () => (
//   <Mutation mutation={REGISTER}>
//     {(register, { loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;
//       let account_type, first_name, phone, email, password, password_confirmation;
//
//       return (
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             register({
//               variables: {
//                 account_type: 'club_owner',
//                 club_type: 'club',
//                 first_name: first_name.value,
//                 phone: phone.value,
//                 email: email.value,
//                 password: password.value,
//                 password_confirmation: password_confirmation.value,
//               },
//             });
//           }}
//         >
//           <input type="text" placeholder="Enter first name" ref={node => (first_name = node)} />
//           <input type="text" placeholder="Enter phone" ref={node => (phone = node)} />
//           <input type="text" placeholder="Enter email" ref={node => (email = node)} />
//           <input type="password" placeholder="Enter password" ref={node => (password = node)} />
//           <input
//             type="password"
//             placeholder="Enter password confirmation"
//             ref={node => (password_confirmation = node)}
//           />
//
//           <button type="submit">Зарегистрироваться</button>
//         </form>
//       );
//     }}
//   </Mutation>
// );

export default Home;
