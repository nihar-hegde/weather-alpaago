// @ts-nocheck
"use client";

"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { MoveUp, MoveDown } from "lucide-react";

const DataTable = () => {
  const [data, setData] = useState([]);
  // state to store the sort direction
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    // create a query with the collection, the field name, and the sort direction
    const q = query(
      collection(db, "users"),
      orderBy("createdAt", sortDirection)
    );
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsub();
    };
  }, [sortDirection]); // add sortDirection as a dependency
  // function to update the status
  const updateStatus = async (id, status) => {
    // get the user document reference
    const userRef = doc(db, "users", id);
    // toggle the status
    const newStatus = status === "active" ? "inactive" : "active";
    // update the status field
    await updateDoc(userRef, { status: newStatus });
  };
  // function to toggle the sort direction
  const toggleSortDirection = () => {
    // switch between asc and desc
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    // update the state variable
    setSortDirection(newSortDirection);
  };
  return (
    <table className="table-auto border divide-y w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            ID
          </th>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Display Name
          </th>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Email
          </th>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Photo
          </th>

          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Created At
            <button
              className={`ml-2 px-2 py-1 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                sortDirection === "asc"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={toggleSortDirection}
            >
              {sortDirection === "asc" ? <MoveUp /> : <MoveDown />}
            </button>
          </th>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Status
          </th>
          <th className="px-4 py-3 text-left text-sm text-gray-900 font-medium">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-500 font-medium">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-100">
            <td className="px-4 py-3 text-sm">{item.id}</td>
            <td className="px-4 py-3 text-sm">{item.displayName}</td>
            <td className="px-4 py-3 text-sm">{item.email}</td>
            <td className="px-4 py-3 text-sm">
              <img
                className="w-16 h-16 object-cover object-center rounded-full"
                src={item.photoURL}
                alt={item.displayName}
              />
            </td>
            <td className="px-4 py-3 text-sm">
              {new Date(
                item.createdAt.seconds * 1000 +
                  item.createdAt.nanoseconds / 1000
              ).toLocaleString()}
            </td>
            <td className="px-4 py-3 text-sm">{item.status}</td>
            <td className="px-4 py-3 text-sm">
              <button
                className={`px-4 py-2 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  item.status === "active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => updateStatus(item.id, item.status)}
              >
                {item.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
