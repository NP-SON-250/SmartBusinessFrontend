import axios from "axios";
import {
  FaUserTie,
} from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { Modal, Popconfirm, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";


const Businesses = () => {
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

    // Table headers
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

  // ============= fetching businesses =================
  const [businessData, setBusinessData] = useState([]);

  const getBusinessData = async () => {
    const response = await axios.get(
      "http://localhost:2400/Smartbusiness/API/business/readAll"
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
      const response = await axios.delete(
        `http://localhost:2400/Smartbusiness/API/business/delete/${id}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${apiKey}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
        
      );
      success("Business deleted successfully!");
      getBusinessData();
    } catch (err) {
      console.error(err);
    }
  }
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
    const apiKey = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:2400/Smartbusiness/API/business/update/${businessDataEdit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
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
        </div>
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
                      <Space>
                        <div
                          onClick={(e) => {
                            getSingleBusiness(item.id);
                            showBusinessModal();
                          }}
                        >
                          <RiEditBoxLine size={24} className="edit-buttom" />
                        </div>
                        <Popconfirm
                          title="Delete Business"
                          description="Are you sure to delete this business?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteBusiness(item.id)}
                        >
                          <MdDelete size={24} className="delete-buttom" />
                        </Popconfirm>
                      </Space>
                    ),
                  };
                })}
                pagination={{
                  defaultPageSize: 5,
                }}
              />
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
                      className="mb-4 "
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
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-white px-2 py-1 mb-4 mt-4"
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
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-white px-2 py-1 mb-4"
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
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-white px-2 py-1 mb-4"
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

export default Businesses;