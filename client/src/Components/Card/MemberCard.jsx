import React from "react";
import { Link } from "react-router-dom";

export default function MemberCard({member: {fullname, phone_number, address, _id}}) {
  return (
    <Link to={`/dashboard/${_id}`} className="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
      <div className="flex justify-center p-5 ">
        <img
          className="rounded-full h-[150px]"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/85229a57490547.59e4b5dfe4a75.gif"
          alt=""
        />
      </div>
      <div className="p-5">
        <table className="flex gap-3">
          <thead>
            <tr className="flex flex-col items-start text-white">
              <th>Name: </th>
              <th>Phone: </th>
              <th>address: </th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-col items-start text-white">
              <th>{fullname} </th>
              <th>{phone_number} </th>
              <th>{address} </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
}
