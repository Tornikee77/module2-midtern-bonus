import { useEffect, useState } from "react";

const App = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => {
        if (!res.ok) throw new Error("something went wrong");
        return res.json();
      })
      .then((data) => {
        setUser(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="flex text-center p-4">loading...</p>;
  if (error)
    return <p className="flex text-center p-4 text-red-600">{error}</p>;
  return (
    <div className="max-w-[1440px mx-auto p-8]">
      <h1>Random Users</h1>
      <div className="flex flex-col gap-4">
        {users.map((user, index) => {
          return (
            <div key={index}>
              <h2 className="text-xl">
                {user.name.first} {user.name.last}
              </h2>
              <div>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>
                  Location: {user.location.city}, {user.location.country}
                </p>
                <p>Age: {user.dob.age}</p>
                <p>Gender: {user.gender}</p>
              </div>
              ;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
