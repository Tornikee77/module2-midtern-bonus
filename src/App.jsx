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

  const filterData = users?.filter((eachElement) => eachElement.dob.age >= 50);

  if (filterData?.length === 0) {
    return <p>დაფიქსირდა შეცდომა</p>;
  }

  return (
    <div className="flex flex-col gap-4 bg-[aqua]">
      {filterData.map((eachElement) => {
        return (
          <div
            key={eachElement}
            className="m-auto gap-[60px] p-[90px] flex flex-col max-w-[900px] w-full bg-white rounded-[50px]"
          >
            <div className="flex items-center gap-[48px]">
              <div className="max-w-[200px] w-full min-h-[200px] rounded-full flex items-center justify-center">
                <img
                  className="rounded-full w-[200px] h-[200px]"
                  src={eachElement.picture.medium}
                  alt="profileimg"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-[15px]">
                  <p className="text-[#000000] text-[50px] font-bold">
                    {eachElement.name.first}
                  </p>
                  <p className="text-[#000000] text-[50px] font-bold">
                    {eachElement.name.last}
                  </p>
                </div>
                <p className="text-[#909090] text-[35px] font-medium">
                  {eachElement.dob.age} / <span>{eachElement.gender}</span>
                </p>
              </div>
            </div>
            <ul className="flex flex-col">
              <li className="flex gap-[204px]">
                <p className="text-[36px] text-[#505050] w-[full] font-bold">
                  Age:
                </p>
                <p className="text-[36px] text-[#505050]">
                  {eachElement.dob.age}
                </p>
              </li>
              <li className="flex gap-[117px]">
                <p className="text-[36px] font-bold text-[#505050] max-w-[163px]  w-full">
                  Name:
                </p>
                <div className="flex gap-[15px]">
                  <p className="text-[36px]  text-[#505050]">
                    {eachElement.name.first}
                  </p>
                  <p className="text-[36px]  text-[#505050]">
                    {eachElement.name.last}
                  </p>
                </div>
              </li>
              <li className="flex gap-[117px]">
                <p className="text-[36px] font-bold text-[#505050] max-w-[163px]  w-full">
                  username:
                </p>
                <div className="flex gap-[15px]">
                  <p className="text-[36px]  text-[#505050]">
                    {eachElement.login.username}
                  </p>
                </div>
              </li>
              <li className="flex gap-[204px]">
                <p className="text-[36px] text-[#505050] w-[full] font-bold">
                  City:
                </p>
                <p className="text-[36px] text-[#505050] ">
                  {eachElement.location.city}
                </p>
              </li>
              <li className="flex gap-[133px]">
                <p className="text-[36px] text-[#505050] w-[full] font-bold">
                  Country:
                </p>
                <p className="text-[36px] text-[#505050] ">
                  {eachElement.location.country}
                </p>
              </li>
              <li className="flex gap-[119px]">
                <p className="text-[36px] text-[#505050] w-[full] font-bold">
                  Postcode:
                </p>
                <p className="text-[36px] text-[#505050] ">
                  {eachElement.location.postcode}
                </p>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default App;
