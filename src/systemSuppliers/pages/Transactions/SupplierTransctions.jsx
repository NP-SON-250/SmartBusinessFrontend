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


const SupplierTransaction = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("Analytics");
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [open, setOpen] = useState(false);
  
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
  
    const columns = [
      {
        title: "Profile",
        dataIndex: "profile",
        key: "profile",
      },
      {
        title: "FirstName",
        dataIndex: "firstName",
        key: "firstName",
  
        width: "20%",
        ...getColumnSearchProps("firstName"),
      },
  
      {
        title: "LastName",
        dataIndex: "lastName",
        key: "lastName",
        width: "20%",
        ...getColumnSearchProps("lastName"),
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        width: "20%",
        ...getColumnSearchProps("email"),
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "10%",
        ...getColumnSearchProps("role"),
      },
      {
        title: "createdAt",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "30%",
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
  
    const handleMenuItemClick = (menuItem) => {
      setSelectedMenuItem(menuItem);
    };
    // =================== adding new user ================
    const success = (message) => {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
  
    const [user, setUser] = useState({
      profile: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    const apiKey = localStorage.getItem("token");
  
    const handleInput = (event) => {
      if (event.target.name === "profile") {
        setUser({ ...user, profile: event.target.files[0] });
      } else {
        setUser({ ...user, [event.target.name]: event.target.value });
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("profile", user.profile);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("role", user.role);
  
      axios
        .post(
          "http://localhost:2400/Smartbusiness/API/users/registerOwner",
          formData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          success("User created successfully");
          setTimeout(() => {
            setOpen(false);
            getData();
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    // ============= fetching users =================
    const [data, setData] = useState([]);
  
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:2400/Smartbusiness/API/users/get/users"
      );
      const data = response.data.data;
      setData(data);
    };
    useEffect(() => {
      getData();
    }, []);
    // ================== delete user =====================
    async function handleDelete(id) {
      try {
        const response = await axios.delete(
          `http://localhost:2400/Smartbusiness/API/users/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("Deleted");
        success("User deleted successfully!");
        getData();
      } catch (err) {
        console.error(err);
      }
    }
    // ============ Edit Modal =========
    const [dataEdit, setDataEdit] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    function getSingleUser(id) {
      axios
        .get(`http://localhost:2400/Smartbusiness/API/users/get/single/${id}`)
        .then((res) => setDataEdit(res.data.data))
        .catch((err) => console.log(err));
    }
  
    function handleUpdate(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("id", dataEdit.id);
      formData.append("profile", dataEdit.profile);
      formData.append("firstName", dataEdit.firstName);
      formData.append("lastName", dataEdit.lastName);
      formData.append("email", dataEdit.email);
      formData.append("role", dataEdit.role);
      const apiKey = localStorage.getItem("token");
      axios
        .put(
          `http://localhost:2400/Smartbusiness/API/users/update/${dataEdit.id}`,
          formData
        )
        .then((res) => {
          success("User updated successfully");
          setTimeout(() => {
            setIsModalOpen(false);
            getData();
          }, 3000);
        });
    }
  
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
        <div
            className="users-container h-[100vh]  lg:ml-64 md:ml-72"
            style={{ padding: "0 20px" }}
          >
            <div className="find-more">
              <div>
                <h3 className="text-center text-2xl font-bold text-gray-900 pt-20 md:pt-20">
                  Record Daily Transactions
                </h3>
              </div>
              <div className="pb-10 pt-5 lg:ml-96">
                <Button
                  className="find-more bg-secondary lg:-ml-[15rem] "
                  onClick={() => setOpen(true)}
                >
                  New Transaction
                </Button>
              </div>
            </div>
            <Modal
              title="Add New User..."
              className="text-center"
              centered
              style={{
                top: -10,
              }}
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            >
              <div className="add__dimension">
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
                  <div className="add__dimension-row">
                    <div>
                      <label>First Name</label>
                      <input
                        type="text"
                        id="title"
                        name="firstName"
                        placeholder="FirstName"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4 mt-4"
                        onChange={handleInput}
                      />
                    </div>

                    <div>
                      <label>Last Name</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastName"
                        placeholder="LastName"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label>Role</label>
                    <select
                      name="role"
                      id="role"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={handleInput}
                    >
                      <option value="seller">seller</option>
                      <option value="supplier">supplier</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                  <Button
                    className="find-more bg-secondary ml-32"
                    name="submit"
                  >
                    Register
                  </Button>
                </form>
              </div>
            </Modal>
            <div>
              <Table
                className="overflow-x-scroll w-full"
                columns={columns}
                size="small"
                dataSource={data.map((item, index) => {
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
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    role: item.role,
                    createdAt: item.createdAt,

                    action: (
                      <Space>
                        <div
                          onClick={(e) => {
                            getSingleUser(item.id);
                            showModal();
                          }}
                        >
                          <RiEditBoxLine size={24} className="edit-buttom" />
                        </div>
                        <Popconfirm
                          title="Delet User"
                          description="Are you sure to delete this User?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDelete(item.id)}
                        >
                          <MdDelete size={24} className="delete-buttom" />
                        </Popconfirm>
                      </Space>
                    ),
                  };
                })}
              />
            </div>
            {/* ================= Edit Modal ================== */}
            <Modal
              title="Edit User"
              style={{
                top: 60,
              }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="add__dimension">
                <form action="#" onSubmit={handleUpdate}>
                  <div className="flex flex-col">
                    <label>Profile</label>

                    <input
                      type="file"
                      id="image"
                      name="profile"
                      accept="image/*"
                      className="mb-4"
                      onChange={(e) => {
                        setDataEdit({
                          ...dataEdit,
                          profile: e.target.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="add__dimension-row">
                    <div>
                      <label>First Name</label>

                      <input
                        type="text"
                        id="title"
                        value={dataEdit.firstName}
                        name="firstName"
                        placeholder="FirstName"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4 mt-4"
                        onChange={(e) => {
                          setDataEdit({
                            ...dataEdit,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label>Last Name</label>

                      <input
                        type="text"
                        id="lastname"
                        value={dataEdit.lastName}
                        name="lastName"
                        placeholder="LastName"
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                        onChange={(e) => {
                          setDataEdit({
                            ...dataEdit,
                            lastName: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={dataEdit.email}
                      placeholder="Enter your Email"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={(e) => {
                        setDataEdit({ ...dataEdit, email: e.target.value });
                      }}
                    />
                  </div>
                  <div>
                    <label>Role</label>
                    <select
                      name="role"
                      value={dataEdit.role}
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                      onChange={(e) => {
                        setDataEdit({ ...dataEdit, role: e.target.value });
                      }}
                    >
                      <option value="buyer">buyer</option>
                      <option value="seller">seller</option>
                      <option value="supplier">supplier</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                  <Button
                    className="find-more bg-secondary ml-32"
                    name="submit"
                  >
                    Update
                  </Button>
                </form>
              </div>
            </Modal>
            <ToastContainer />
          </div>
    );
};

export default SupplierTransaction;