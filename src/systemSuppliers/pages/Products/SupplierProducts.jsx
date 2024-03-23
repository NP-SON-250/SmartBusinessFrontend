import axios from "axios";
import {
  FaUserTie,
} from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table} from "antd";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { Modal, Popconfirm, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";


const SupplierProducts = () => {
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

    width: "25%",
    ...getColumnSearchProps("name"),
  },

  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "25%",
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
    width: "20%",
    ...getColumnSearchProps("unitCost"),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: "10%",
    ...getColumnSearchProps("total"),
  },
  {
    title: "SalePrice",
    dataIndex: "salePrice",
    key: "salePrice",
    width: "20%",
    ...getColumnSearchProps("salePrice"),
  },
  {
    title: "ProductOwner",
    dataIndex: "businessId",
    key: "businessId",
    width: "20%",
    ...getColumnSearchProps("businessId"),
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
const [productData, setProductData] = useState([]);

const getProductData = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:2400/Smartbusiness/API/stocks/suppliers/readYourProducts",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    
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
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:2400/Smartbusiness/API/stocks/delete/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    success("Business deleted successfully!");
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
    .get(`http://localhost:2400/Smartbusiness/API/stocks/singleProduct/${id}`)
    .then((res) => setProductDataEdit(res.data.data))
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
  const token = localStorage.getItem("token");
  axios
    .put(
      `http://localhost:2400/Smartbusiness/API/stocks/update/${productDataEdit.id}`,
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
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
      className="business-container h-[100vh] lg:ml-64 md:ml-72"
      style={{ padding: "0 20px" }}
    >
      <div className="find-more">
        <div>
        <h3 className="text-center text-2xl font-bold text-gray-900 pt-32 md:pt-32 pb-10">
          Manage Product
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
                  createdAt: item.createdAt,

                  action: (
                    <Space className="flex gap-5">
                      <div
                        onClick={(e) => {
                          getSingleProduct(item.id);
                          showProductModal();
                        }}
                        
                      >
                        <RiEditBoxLine size={24} className="edit-buttom hover:cursor-pointer" />
                      </div>
                      <Popconfirm
                        title="Delete Product"
                        description="Are you sure to delete this product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={(e) => handleDeleteProduct(item.id)}
                      >
                        <MdDelete size={24} className="delete-buttom hover:cursor-pointer" />
                      </Popconfirm>
                    </Space>
                  ),
                };
              })}
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
                <div className="add__dimension-row">
                  <div>
                    <label>Product Name</label>

                    <input
                      type="text"
                      id="title"
                      value={productDataEdit.name}
                      name="name"
                      placeholder="Name of business"
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
                    <label>Category</label>

                    <input
                      type="text"
                      id="category"
                      value={productDataEdit.category}
                      name="category"
                      placeholder="ProductCategory"
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
                    <label>Quantity</label>

                    <input
                      type="number"
                      id="quantity"
                      value={productDataEdit.quantity}
                      name="quantity"
                      placeholder="ProductQuantity"
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
                    <label>Unit Cost</label>

                    <input
                      type="text"
                      id="unitCost"
                      value={productDataEdit.unitCost}
                      name="unitCost"
                      placeholder="ProductUnitCost"
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
                    <label>Sale Price</label>

                    <input
                      type="text"
                      id="salePrice"
                      value={productDataEdit.salePrice}
                      name="salePrice"
                      placeholder="ProductSalePrice"
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

export default SupplierProducts;