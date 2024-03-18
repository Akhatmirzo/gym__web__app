import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MemberCard from "../../Components/Card/MemberCard";
import MemberModal from "../../Components/Modal/MemberModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || token === undefined) {
      navigate("/");
      setLoading(false);
    }
  }, []);

  //Create Member
  const createMember = async (member) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/member",
        member,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(response.statusText);
      } else {
        setShowModal(false);
      }

      getAllMembers();
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Members
  const getAllMembers = async () => {
    if (!showModal) setLoading(true);
    try {
      const responce = await axios.get("http://localhost:8000/api/member", {
        headers: {
          authorization: token,
        },
      });

      if (responce.status !== 200) {
        throw new Error(responce.statusText);
      }

      setMembers(responce.data.Members);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && token !== undefined) {
      getAllMembers();
    }
  }, []);

  return (
    <div className="flex flex-col ">
      <Navbar setShowModal={setShowModal} />
      <div className="w-full h-[calc(100vh_-_77px)] overflow-x-hidden overflow-y-scroll px-5">
        <div className="flex flex-wrap gap-5">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>

      <MemberModal
        showModal={showModal}
        setShowModal={setShowModal}
        createMember={createMember}
      />
    </div>
  );
}
