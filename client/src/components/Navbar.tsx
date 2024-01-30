import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: state.id }),
      });

      if (response.ok) {
        dispatch({ type: "SET_USER", payload: { id: null, username: null } });
        navigate("/");
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error signing user out:", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/xyz-logo.svg"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none hover:text-gray-900 focus:text-gray-900">
                    <span className="sr-only">Open user menu</span>
                    <div className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500">
                      {state.username}
                    </div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={handleSignOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
