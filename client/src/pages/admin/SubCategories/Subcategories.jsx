import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSubcategories,
  editSubcategory,
  deleteSubcategory,
  createSubcategory,
} from '../../../features/subcategories/subcategoriesSlice';
import Layout from '../../../layouts/Layout';

const ManageSubcategories = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const {subcategories,isLoading,error} = useSelector(state => state.subcategories);

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    dispatch(getAllSubcategories());

  }, [dispatch, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(createSubcategory(name));
      console.log("Create Subcategory Response:", response);

      if (response?.meta?.requestStatus === 'fulfilled') {
        const { success, subcategory } = response.payload;

        console.log("Success:", success);
        console.log("Subcategory:", subcategory);

        if (success) {
          console.log("Subcategory created successfully");
          dispatch(getAllSubcategories());
          setName("");
          setIsAddingSubcategory(false);
        } else {
          console.error("Subcategory creation failed. Unexpected payload:", response.payload);
        }
      } else {
        console.error("Subcategory creation failed. Response:", response);
      }
    } catch (error) {
      console.error("Something went wrong in the input form", error);
    }
  };



  const handleUpdate = async () => {
    if (!selectedSubcategory) {
      console.error("No subcategory selected for update");
      return;
    }

    try {
      const { data } = await dispatch(editSubcategory({ id: selectedSubcategory._id, name: updatedName }));

      if (data?.succes) {
        setUpdatedName("");
        setSelectedSubcategory(null);
        dispatch(getAllSubcategories());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during subcategory update", error);
    }
  };

  const handleDelete = async (subcategoryId) => {
    try {
      const response = await dispatch(deleteSubcategory(subcategoryId));

      if (response?.meta?.requestStatus === 'fulfilled') {
        console.log("Subcategory deleted");
        dispatch(getAllSubcategories());
      } else {
        console.error(response?.payload || "Unknown error");
      }
    } catch (error) {
      console.error("Error during subcategory deletion", error);
    }
  };



  const handleConfirmDelete = () => {
    if (confirmDelete) {
      handleDelete(confirmDelete);
      setConfirmDelete(null);
    }
  };

  // Function to open the add subcategory modal
  const openAddSubcategoryModal = () => {
    setIsAddingSubcategory(true);
  };

  // Function to close the add subcategory modal
  const closeAddSubcategoryModal = () => {
    setIsAddingSubcategory(false);
  };

  const filteredSubcategories = subcategories.filter(subcategory => subcategory && subcategory.name && subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <p>Loading...</p>

  return (
    <Layout>
       <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold text-center">Manage Subcategories</h1>
      <div className="flex justify-between items-center mt-4 mb-8">
        <div>
          <input
            type="text"
            placeholder="Search Subcategories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <button
            onClick={openAddSubcategoryModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add a Subcategory
          </button>
        </div>
      </div>

      {/* Add Subcategory Modal */}
      {isAddingSubcategory && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative bg-white p-6 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new subcategory"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary bg-blue-500 text-black px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
              <button
                onClick={closeAddSubcategoryModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )
      }

      {/* List of Subcategories */}
      <div className="min-w-full bg-white border rounded-lg shadow-md">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.map((subcategory) => (
              <tr key={subcategory._id} className="bg-white">
                <td className="py-5 border-b border-gray-200 text-sm px-4">
                  {subcategory.name}
                </td>
                <td className="py-5 border-b border-gray-200 text-sm">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategory(subcategory)}
                      className=" hover:text-blue-700 mx-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(subcategory._id)}
                      className=" hover:text-red-700 mx-2  bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSubcategory && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative bg-white p-6 shadow-lg rounded-lg">
            <form onSubmit={handleUpdate}>
              <div className="input-group mb-4">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter updated subcategory"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                  Update
                </button>
              </div>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )
      }

      {/* Delete Subcategory Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative bg-white p-6 shadow-lg rounded-lg">
            <p className="mb-4">Are you sure you want to delete this subcategory?</p>
            <button onClick={handleConfirmDelete} className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2">
              Confirm
            </button>
            <button
              onClick={() => setConfirmDelete(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mx-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )
      }
    </div>
    </Layout>
  );
};

export default ManageSubcategories;
