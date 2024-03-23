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


const Products = () => {
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

    //=======Product side======

  const productCols = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "ProductName",
      dataIndex: "name",
      key: "name",

      width: "20%",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "UnitCost",
      dataIndex: "unitCost",
      key: "unitCost",
      width: "12%",
      ...getColumnSearchProps("unitCost"),
    },

    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      width: "10%",
      ...getColumnSearchProps("total"),
    },
    {
      title: "SellingPrice",
      dataIndex: "salePrice",
      key: "salePrice",
      width: "15%",
      ...getColumnSearchProps("salePrice"),
    },
    {
      title: "ProductOwner",
      dataIndex: "businessId",
      key: "businessId",
      width: "30%",
      ...getColumnSearchProps("businessId"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  // ============= fetching businesses =================
  const [productData, setProductData] = useState([]);

  const getProductData = async () => {
    const response = await axios.get(
      "http://localhost:2400/Smartbusiness/API/stocks/readAllProducts"
    );
    const data = response.data.data;
    setProductData(data);
  };
  useEffect(() => {
    getProductData();
  }, []);
  // ================== delete business =====================
  async function handleDeleteProduct(id) {
    try {
      const response = await axios.delete(
        `http://localhost:2400/Smartbusiness/API/stocks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      success("Product deleted successfully!");
      getProductData();
    } catch (err) {
      console.error(err);
    }
  }
  // ============ Edit Modal =========
  const [productDataEdit, setProductDataEdit] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  function getSingleProduct(id) {
    axios
      .get(
        `http://localhost:2400/Smartbusiness/API/stocks/singleProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setProductDataEdit(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function handleProductUpdate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile", productDataEdit.profile);
    formData.append("name", productDataEdit.name);
    formData.append("category", productDataEdit.category);
    formData.append("quantity", productDataEdit.quantity);
    formData.append("unitCost", productDataEdit.unitCost);
    formData.append("salePrice", productDataEdit.salePrice);

    const apiKey = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:2400/Smartbusiness/API/stocks/update/${productDataEdit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        success("Product updated successfully");
        setTimeout(() => {
          setIsProductModalOpen(false);
          getProductData();
        }, 2000);
      });
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


  return (
    <div
        className="products-container h-[100vh] lg:ml-64 md:ml-72"
        style={{ padding: "0 20px" }}
      >
        <div className="find-more">
          <div>
            <h3 className="text-center text-2xl font-bold text-gray-900 pt-32 md:pt-32 pb-10">
          Manage Products
        </h3>
      </div>
    </div>
    <div>
      <Table
        className="overflow-x-scroll"
        columns={productCols}
        size="small"
        dataSource={productData.map((item, index) => {
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
            category: item.category,
            quantity: item.quantity,
            unitCost: item.unitCost,
            total: item.total,
            salePrice: item.salePrice,
            businessId: item.businessOfferingIt.name,

            action: (
              <Space>
                <div
                  onClick={(e) => {
                    getSingleProduct(item.id);
                    showProductModal();
                  }}
                >
                  <RiEditBoxLine size={24} className="edit-buttom" />
                </div>
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure to delete this product?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={(e) => handleDeleteProduct(item.id)}
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
      title="Edit Product"
      style={{
        top: 40,
      }}
      open={isProductModalOpen}
      onOk={handleProductOk}
      onCancel={handleProductCancel}
    >
      <div className="add__dimension">
        <form action="#" onSubmit={handleProductUpdate}>
          <div className="flex flex-col">
            <label>Profile</label>

            <input
              type="file"
              id="image"
              name="profile"
              accept="image/*"
              className="mb-4"
              onChange={(e) => {
                setProductDataEdit({
                  ...productDataEdit,
                  profile: e.target.files[0],
                });
              }}
            />
          </div>
          <div className="">
            <div>
              <label>Name</label>

              <input
                type="text"
                id="title"
                value={productDataEdit.name}
                name="name"
                placeholder="Name of product"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4 mt-4"
                onChange={(e) => {
                  setProductDataEdit({
                    ...productDataEdit,
                    name: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <label>Product Category</label>

              <input
                type="text"
                id="category"
                value={productDataEdit.category}
                name="category"
                placeholder="Product Category"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                onChange={(e) => {
                  setProductDataEdit({
                    ...productDataEdit,
                    category: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>Product Quantity</label>

              <input
                type="text"
                id="category"
                value={productDataEdit.quantity}
                name="category"
                placeholder="Product Category"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                onChange={(e) => {
                  setProductDataEdit({
                    ...productDataEdit,
                    quantity: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>Product UnitCost</label>

              <input
                type="text"
                id="category"
                value={productDataEdit.unitCost}
                name="category"
                placeholder="Product Category"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                onChange={(e) => {
                  setProductDataEdit({
                    ...productDataEdit,
                    unitCost: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>Product SalePrice</label>

              <input
                type="text"
                id="category"
                value={productDataEdit.salePrice}
                name="category"
                placeholder="Product Category"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                onChange={(e) => {
                  setProductDataEdit({
                    ...productDataEdit,
                    salePrice: e.target.value,
                  });
                }}
              />
            </div>
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

export default Products;