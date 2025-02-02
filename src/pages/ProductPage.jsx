import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { Modal } from 'bootstrap';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';
import DelProductModal from '../components/DelProductModal'

const BASE_URL=import.meta.env.VITE_BASE_URL;
const API_PATH=import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};
function ProductPage(){

  const [products,setProducts] = useState([])

  const [isProductModalOpen,setIsProductModalOpen]=useState(false);
  const [isDelProductModalOpen,setIsDelProductModalOpen]=useState(false);
  
    // Modal 開啟
  const handleOpenProductModal=(mode,product)=>{
    setModalMode(mode);
    switch (mode) {
      case 'create':
        setTempProduct(defaultModalState);
        break;
      case 'edit':
        setTempProduct(product);
        break;
      default:
        break;
    }
    setIsProductModalOpen(true);
  }

    // 2. 取得產品列表
  const getProducts = async(page = 1)=>{
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`);
      setProducts(res.data.products);
      // 從 產品 API 取得頁面資訊，並存進狀態中
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗");
    }
  }

  useEffect(()=>{
    getProducts();
  },[])
  
  
  // 按鈕判斷新增 或是 編輯
  const [modalMode,setModalMode]=useState(null);


  const handleOpenDelProductModal=(product)=>{
    setTempProduct(product);
    setIsDelProductModalOpen(true);
  }
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  // 新增一個狀態用來儲存頁面資訊
  const [pageInfo,setPageInfo] = useState({})
  // 換頁資訊
  const handlePageChange = (page) =>{
    getProducts(page);
  }
  
  return(
    <>
(
    <div className="container py-5">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between">
            <h2>產品列表</h2>
            <button onClick={()=>handleOpenProductModal('create')} type="button" className="btn btn-primary">建立新的產品</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.title}</th>
                  <td>{product.origin_price}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? (
                    <span className="text-success">啟用</span>):<span>未啟用</span>}</td>
                  <td>
                    <div className="btn-group">
                      <button onClick={()=>handleOpenProductModal('edit',product)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                      <button onClick={()=>handleOpenDelProductModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}/>
        
      </div>
    </div>)


    <ProductModal 
      tempProduct={tempProduct}
      modalMode={modalMode}
      isOpen={isProductModalOpen}
      setIsOpen={setIsProductModalOpen}
      getProducts={getProducts}
    />

    <DelProductModal 
      tempProduct={tempProduct}
      isOpen={isDelProductModalOpen}
      setIsOpen={setIsProductModalOpen}
      getProducts={getProducts}
    />
    </>
  )
}

export default ProductPage