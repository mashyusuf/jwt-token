import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Any = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}` // Replace 'token' with the actual key name you used
        }
      });
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>; 
  }

  return (
    <div>
      <h2>All Users Here: {users.length}</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li> // Display each user's name
        ))}
      </ul>
    </div>
  );
};

export default Any;
