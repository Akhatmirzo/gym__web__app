import React, { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
} from "tw-elements-react";

export default function MemberShipModal({
  showModal,
  setShowModal,
  data,
  addMemberShip,
}) {
  const [inputValues, setInputValues] = useState({
    fullname: "",
    from: "",
    to: "",
    price: 0,
    member_id: "",
  });

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMemberShip({
      ...inputValues,
      member_id: data._id,
      fullname: data.fullname,
    });
    setShowModal(false);

    setInputValues({
      fullname: "",
      from: "",
      to: "",
      price: 0,
      member_id: "",
    });
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Create new memberShip
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="block w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <form onSubmit={handleSubmit}>
                  {/* <!--Fullname input--> */}
                  <TEInput
                    type="text"
                    label="Fullname"
                    className="mb-6"
                    name="fullname"
                    value={`${data.fullname}`}
                    disabled
                  ></TEInput>

                  {/* <!--From input--> */}
                  <TEInput
                    type="date"
                    label="From"
                    className="mb-6"
                    name="from"
                    value={inputValues.from}
                    onChange={handleInputChange}
                  ></TEInput>

                  {/* <!--From input--> */}
                  <TEInput
                    type="date"
                    label="To"
                    className="mb-6"
                    name="to"
                    value={inputValues.to}
                    onChange={handleInputChange}
                  ></TEInput>

                  {/* <!--From input--> */}
                  <TEInput
                    type="number"
                    label="Price"
                    className="mb-6"
                    name="price"
                    value={inputValues.price}
                    onChange={handleInputChange}
                  ></TEInput>

                  {/* <!--Submit button--> */}
                  <TERipple rippleColor="light" className="w-full">
                    <button className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]">
                      Create MemberShip
                    </button>
                  </TERipple>
                </form>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
