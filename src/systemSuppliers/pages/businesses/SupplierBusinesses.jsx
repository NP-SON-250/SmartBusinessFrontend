import axios from "axios";
import {
  FaUserTie,
} from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { Modal, Popconfirm } from "antd";
import { ToastContainer, toast } from "react-toastify";


const SupplierBusinesses = () => {
    const [open, setOpen] = useState(false);
    const success = (message) => {
      toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    const errors = (message) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  
    // ============== searchText ============
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 50,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 50,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1677ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });

    //=======Businesses side======

  const businessCols = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "BusinessName",
      dataIndex: "name",
      key: "name",

      width: "25%",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
      ...getColumnSearchProps("description"),
    },
    {
      title: "BusinessType",
      dataIndex: "type",
      key: "type",
      width: "10%",
      ...getColumnSearchProps("type"),
    },
    {
      title: "BusinessOwner",
      dataIndex: "userId",
      key: "userId",
      width: "20%",
      ...getColumnSearchProps("userId"),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      ...getColumnSearchProps("createdAt"),
      render: (text, record) => {
        const formattedDate = new Date(text).toLocaleString();

        return formattedDate;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  // =================== Creatting Business ================
    
  const [business, setBusiness] = useState({
    profile: "",
    name: "",
    type: "",
    description: "",
  });
  const handleInput = (event) => {
    if (event.target.name === "profile") {
      setBusiness({ ...business, profile: event.target.files[0] });
    } else {
      setBusiness({ ...business, [event.target.name]: event.target.value });
    }
  };
  const handleSubmit = async (event) => {
    
      event.preventDefault();
      const formData = new FormData();
      formData.append("profile", business.profile);
      formData.append("name", business.name);
      formData.append("type", business.type);
      formData.append("description", business.description);
  
      console.log("Form Data:", formData);;

      const token = localStorage.getItem("token");

    if (!token) {
      errors ("Login first!!");
    }   else{
      try {
        const response = await axios.post(
          `http://localhost:2400/Smartbusiness/API/business/register`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          success(response.data.message);
          setTimeout(() => {
            setOpen(false);
            getBusinessData();
          }, 2000);
        } else {
          errors(response.data.message);
          setTimeout(() => {
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);

        if (error.response) {
          errors(error.response.data.message);
        } else if (error.request) {
          console.error("No Response from Server");
        } else {
         console.error("Request Setup Error:", error.message);
        }
      }
    };
  }

  // ============= fetching businesses =================
  const [businessData, setBusinessData] = useState([]);

  const getBusinessData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:2400/Smartbusiness/API/business/readAll/bysupplier",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      
    );
    const data = response.data.data;
    setBusinessData(data);
  };
  useEffect(() => {
    getBusinessData();
  }, []);
  // ================== delete business =====================
  async function handleDeleteBusiness(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:2400/Smartbusiness/API/business/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      success("Business deleted successfully!");
      getBusinessData();
    } catch (err) {
      console.error(err);
    }
  }
  //============ Recording product to created business =======//

  
const [product, setProduct] = useState({
  profile: "",
  name: "",
  category: "",
  quantity: "",
  unitCost: "",
  salePrice: "",
});
const handleInputPro = (event) => {
  if (event.target.name === "profile") {
    setProduct({ ...product, profile: event.target.files[0] });
  } else {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }
};
const [myId, setMyId] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  function getSingleMyBusiness(id) {
    axios
      .get(`http://localhost:2400/Smartbusiness/API/business/readSingle/${id}`)
      .then((res) => setMyId(res.data.data))
      .catch((err) => console.log(err));
      
  }
  const handleSubmitPro = async (event) => {
  
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile", product.profile);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("unitCost", product.unitCost);
    formData.append("salePrice", product.salePrice);
    console.log("Form Data:", formData);;

    const token = localStorage.getItem("token");

  if (!token) {
    errors ("Login first!!");
  }   else{
    try {
      const response = await axios.post(
        `http://localhost:2400/Smartbusiness/API/stocks/addProductToStock/${myId.id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        success(response.data.message);
        setTimeout(() => {
          setIsProductModalOpen(false);
        }, 2000);
      } else {
        errors(response.data.message);
        setTimeout(() => {
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        errors(error.response.data.message);
      } else if (error.request) {
        console.error("No Response from Server");
      } else {
       console.error("Request Setup Error:", error.message);
      }
    }
  };
}
const showProductModal = () => {
  setIsProductModalOpen(true);
};
const handleProductOk = () => {
  setIsProductModalOpen(false);
};
const handleProductCancel = () => {
  setIsProductModalOpen(false);
};
  // ============ Edit Modal =========
  const [businessDataEdit, setBusinessDataEdit] = useState([]);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

  function getSingleBusiness(id) {
    axios
      .get(`http://localhost:2400/Smartbusiness/API/business/readSingle/${id}`)
      .then((res) => setBusinessDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  function handleBusinessUpdate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile", businessDataEdit.profile);
    formData.append("name", businessDataEdit.name);
    formData.append("description", businessDataEdit.description);
    formData.append("type", businessDataEdit.type);
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:2400/Smartbusiness/API/business/update/${businessDataEdit.id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        success("Business updated successfully");
        setTimeout(() => {
          setIsBusinessModalOpen(false);
          getBusinessData();
        }, 2000);
      });
  }

  const showBusinessModal = () => {
    setIsBusinessModalOpen(true);
  };
  const handleBusinessOk = () => {
    setIsBusinessModalOpen(false);
  };
  const handleBusinessCancel = () => {
    setIsBusinessModalOpen(false);
  };


  return (
    <div
        className="business-container h-[100vh] lg:ml-64 md:ml-72"
        style={{ padding: "0 20px" }}
      >
        <div className="find-more">
          <div>
          <h3 className="text-center text-2xl font-bold text-gray-900 pt-32 md:pt-32 pb-10">
            Manage Businesses
            </h3>
          </div>
              <div className="pb-10 pt-5 lg:ml-96">
                <Button
                  className="find-more bg-secondary lg:-ml-[15rem] "
                  onClick={() => setOpen(true)}
                >
                  Add Business
                </Button>
              </div>
        </div>
            <Modal
              title="Add New Business..."
              className="text-center"
              centered
              style={{
                top: -10,
              }}
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              >
              <div className="add__business">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label>Profile</label>
                    <input
                      type="file"
                      id="image"
                      name="profile"
                      accept="image/*"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="row">
                    <div>
                      <label>Busness Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="BusinessName"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4 mt-4"
                        onChange={handleInput}
                      />
                    </div>

                    <div>
                      <label>Description</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Business Description"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label>Business Type</label>
                    <select
                      name="type"
                      id="type"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInput}
                    >
                      <option value="">select type</option>
                      <option value="singleSeller">singleSeller</option>
                      <option value="multiSeller">multiSeller</option>
                    </select>
                  </div>
                  <button
                    className="find-more bg-secondary ml-32 text-white p-2 rounded-lg"
                    name="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </Modal>
        <div>
              <Table
                className="overflow-x-scroll"
                columns={businessCols}
                size="small"
                dataSource={businessData.map((item, index) => {
                  return {
                    key: item.id,
                    profile: (
                      <div className="w-10 h-10">
                        {!item.profile ? (
                          <FaUserTie size={24} />
                        ) : (
                          <img
                            src={item.profile}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        )}
                      </div>
                    ),
                    name: item.name,
                    description: <p>{item.description.substring(0, 25)} ...</p>,
                    userId:
                      item.businessOwner.firstName +
                      " " +
                      item.businessOwner.lastName,
                    type: item.type,
                    createdAt: item.createdAt,

                    action: (
                      <Space className="flex gap-5">
                        <div
                          onClick={(e) => {
                            getSingleBusiness(item.id);
                            showBusinessModal();
                          }}
                        >
                          <RiEditBoxLine size={24} className="edit-buttom hover:cursor-pointer" />
                        </div>
                        <Popconfirm
                          title="Delete Business"
                          description="Are you sure to delete this business?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteBusiness(item.id)}
                        >
                          <MdDelete size={24} className="delete-buttom hover:cursor-pointer"/>
                        </Popconfirm>
                        <div
                          onClick={(e) => {
                            getSingleMyBusiness(item.id);
                            showProductModal();
                          }}
                        >
                          <RiAddBoxLine size={24} className="edit-buttom hover:cursor-pointer" />
                        </div>
                      </Space>
                    ),
                  };
                })}
              />
            </div>
            {/*==================Add product model============= */}
            <div>
            <Modal
            title="Add New Product..."
            className="text-center py-10"
            centered
            style={{
              top: -10,
            }}
            open={isProductModalOpen}
              onOk={handleProductOk}
              onCancel={handleProductCancel}
            >
            <div className="add-bussiness">
              <form action="#" onSubmit={handleSubmitPro}>
                <div className="flex flex-col">
                  <label>Profile</label>
                  <input
                    type="file"
                    id="image"
                    name="profile"
                    accept="image/*"
                    onChange={handleInputPro}
                  />
                </div>
                <div className="row">
                  <div>
                    <label>Product Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="ProductName"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4 mt-4"
                      onChange={handleInputPro}
                    />
                  </div>

                  <div>
                    <label>Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="ProductCategory"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInputPro}
                    />
                  </div>
                  <div>
                    <label>Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="ProductQuantity"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInputPro}
                    />
                  </div>
                  <div>
                    <label>Unit Cost</label>
                    <input
                      type="text"
                      id="unitCost"
                      name="unitCost"
                      placeholder="ProductUnitCost"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInputPro}
                    />
                  </div>
                  <div>
                    <label>Selling Price</label>
                    <input
                      type="text"
                      id="salePrice"
                      name="salePrice"
                      placeholder="ProductSalePrice"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInputPro}
                    />
                  </div>
                </div>
                <button
                  className="find-more bg-secondary ml-32 text-white p-2 rounded-lg"
                  name="submit"
                >
                  Add Product
                </button>
              </form>
            </div>
          </Modal>
            </div>
            {/* ================= Edit Modal ================== */}
            <Modal
              title="Edit Business"
              style={{
                top: 40,
              }}
              open={isBusinessModalOpen}
              onOk={handleBusinessOk}
              onCancel={handleBusinessCancel}
            >
              <div className="add__dimension">
                <form action="#" onSubmit={handleBusinessUpdate}>
                  <div className="flex flex-col">
                    <label>Profile</label>

                    <input
                      type="file"
                      id="image"
                      name="profile"
                      accept="image/*"
                      className="mb-4"
                      onChange={(e) => {
                        setBusinessDataEdit({
                          ...businessDataEdit,
                          profile: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="add__dimension-row">
                    <div>
                      <label>Name</label>

                      <input
                        type="text"
                        id="title"
                        value={businessDataEdit.name}
                        name="name"
                        placeholder="Name of business"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 mt-4"
                        onChange={(e) => {
                          setBusinessDataEdit({
                            ...businessDataEdit,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label>Deacription</label>

                      <input
                        type="text"
                        id="description"
                        value={businessDataEdit.description}
                        name="description"
                        placeholder="Business description"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                        onChange={(e) => {
                          setBusinessDataEdit({
                            ...businessDataEdit,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Type</label>
                    <select
                      name="type"
                      value={businessDataEdit.type}
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      onChange={(e) => {
                        setBusinessDataEdit({
                          ...businessDataEdit,
                          type: e.target.value,
                        });
                      }}
                    >
                      <option value="singleSeller">singleSeller</option>
                      <option value="multiSeller">multiSeller</option>
                    </select>
                  </div>
                  <button
                    className="find-more bg-secondary ml-32 text-white p-2 rounded-lg"
                    name="submit"
                  >
                    Update
                  </button>
                </form>
              </div>
            </Modal>
            <ToastContainer />
      </div>
);
};

export default SupplierBusinesses;