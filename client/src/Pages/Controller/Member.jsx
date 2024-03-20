import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MemberShipModal from "../../Components/Modal/MemberShipModal";
import EditMemberModal from "../../Components/Modal/EditMemberModal";
import LoadingMagnify from "../../Components/Loadings/LoadingMagnify";
import { toast } from "react-toastify";

export default function Member({ setLoading, url }) {
  const [member, setMember] = useState({});
  const [memberShip, setMemberShip] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [EditMemberPopUp, setEditMemberPopUp] = useState(false);

  const [spin, setSpin] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/");
      setLoading(false);
    }
  }, []);

  //Gel One Member
  const getOneMember = async () => {
    if (!showModal) setLoading(true);
    try {
      const response = await axios.get(
        `${url}api/member/${params.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      setMember(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Membership
  const addMemberShip = async (data) => {
    try {
      const response = await axios.post(
        `${url}api/membership`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      getAllMemberShips();
    } catch (error) {
      console.log(error);
    }
  };

  // Gel All MemberShips
  const getAllMemberShips = async () => {
    setSpin(true);
    try {
      const response = await axios.get(`${url}api/membership`, {
        headers: {
          member_id: params.id,
          authorization: token
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      setMemberShip(response.data?.data || []);
      setSpin(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a member
  const deleteMember = async () => {
    try {
      const response = await axios.delete(
        `${url}api/member/${params.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (e) {
      toast.error(e.response.data.error);
      console.log(e);
    }
  };

  // Update a member
  const updateMember = async (data) => {
    try {
      const response = await axios.put(
        `${url}api/member/${params.id}`,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      console.log(response);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && token !== undefined) {
      getOneMember();
    }
  }, []);

  useEffect(() => {
    if (token && token !== undefined) {
      getAllMemberShips();
    }
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="w-[40vw] h-screen p-5 border-2 border-black bg-black flex flex-col gap-10">
          <Link
            className=" w-[100px] flex items-center justify-center"
            to={"/dashboard"}
          >
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Dashboard
              </span>
            </button>
          </Link>
          <h2 className="text-2xl text-white">Fullname: {member.fullname}</h2>
          <h2 className="text-2xl text-white">
            Phone Number: {member.phone_number}
          </h2>
          <h2 className="text-2xl text-white">birthdate: {member.birthdate}</h2>
          <h2 className="text-2xl text-white">address: {member.address}</h2>
          <h2 className="text-2xl text-white">gender: {member.gender}</h2>
          <h2 className="text-2xl text-white">age: {member.age}</h2>

          <div className="flex items-center">
            <button
              onClick={() => deleteMember()}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
            <button onClick={() => setEditMemberPopUp(true)}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Edit
            </button>
          </div>
        </div>
        <div className="w-full relative">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold">MemberShip</h2>

            <button onClick={() => setShowModal(true)} className="btn__primary">
              Add MemberShip
            </button>
          </div>

          <LoadingMagnify spin={spin} />

          <table className="w-full">
            <thead className="w-full border-2 border-black">
              <tr className="w-full border-2 border-black">
                <th className="border-2 border-black p-5 text-xl">Fullname</th>
                <th className="border-2 border-black p-5 text-xl">From</th>
                <th className="border-2 border-black p-5 text-xl">To</th>
                <th className="border-2 border-black p-5 text-xl">Price</th>
                <th className="min-w-[200px] max-w-[200px]">Options</th>
              </tr>
            </thead>
            <tbody className="w-full border-2 border-black">
              {memberShip.map((payShip) => {
                return (
                  <tr
                    key={payShip._id}
                    className="w-full border-2 border-black"
                  >
                    <td className="border-2 border-black p-2">
                      {payShip.fullname}
                    </td>
                    <td className="border-2 border-black p-2">
                      {payShip.from}
                    </td>
                    <td className="border-2 border-black p-2">{payShip.to}</td>
                    <td className="border-2 border-black p-2">
                      {payShip.price}
                    </td>
                    <td className="min-w-[200px] max-w-[200px] flex items-center justify-center">
                      <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                      </button>
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <MemberShipModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={member}
        addMemberShip={addMemberShip}
      />

      <EditMemberModal
        EditMemberPopUp={EditMemberPopUp}
        setEditMemberPopUp={setEditMemberPopUp}
        updateMember={updateMember}
        member={member}
      />
    </>
  );
}
