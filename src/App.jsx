import { useState,useEffect,useRef } from 'react'
import * as bootstrap from "bootstrap";
import axios from 'axios';
import Login from './component/Login';
import ProductList from './component/ProductList'
import ProductModal from './component/ProductModal';
import Pagination from './component/Pagination' 

const api = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH

function App() {
  const [user, setUser] = useState({
    username:'',
    password:''
  })
  const [product,setProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: 0,
    price: 0,
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""],
    tags:[],
  })
  const [isLogin, setIsLogin] = useState(false)
  const [products,setProducts] = useState([])   // 產品列表
  const [isEdit, setIsEdit] = useState(false)   // 是否編輯
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false)
  const [pagination, setPagination] = useState({})
  
  const addModalRef = useRef(null)
  const addModal = useRef(null)


  useEffect(()=>{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      axios.defaults.headers.common.Authorization = token;
    } else {
      console.log("Token not found");
    }

    checkLogin()
  },[])

  async function checkLogin(){
    try {
      await axios.post(`${api}/v2/api/user/check`)
      getProducts()
      setIsLogin(true)
    } catch (error) {
      console.log(error);
      
    }
  }

  // 產品新增跳窗
  const openAddModal = () =>{
    setIsEdit(false)
    setProduct({
      id: "",
      imageUrl: "",
      title: "",
      category: "",
      unit: "",
      origin_price: 0,
      price: 0,
      description: "",
      content: "",
      is_enabled: 0,
      imagesUrl: [""],
      tags:[],
    })
    addModal.current = new bootstrap.Modal(addModalRef.current)
    addModal.current.show()
  }

  // 產品編輯跳窗
  const openEditModal = (productData) =>{
    setIsEdit(true)
    setProduct({
      id: productData.id|| "",
      imageUrl: productData.imageUrl || "",
      title: productData.title || "",
      category: productData.category || "",
      unit: productData.unit || "",
      origin_price:productData.origin_price ||  0,
      price:productData.price||  0,
      description:productData.description ||  "",
      content:productData.content || "",
      is_enabled:productData.is_enabled || 0 ,
      imagesUrl: productData.imagesUrl || [""],
      tags:productData.tags || [],
    })
    addModal.current = new bootstrap.Modal(addModalRef.current)
    addModal.current.show()
  }

  // 取得產品資訊
  async function getProducts(e,page=1) {
    if(e){
      e.preventDefault()
    }
    try {
      const res =  await axios.get(`${api}/v2/api/${path}/admin/products?page=${page}`)
      setProducts(res.data.products)
      setPagination(res.data.pagination)
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleDelete (id){
    if(isSubmittingDelete) return
    setIsSubmittingDelete(true)
    try {
      const res = await axios.delete(`${api}/v2/api/${path}/admin/product/${id}`)
      getProducts()
      alert('成功刪除')
      setIsSubmittingDelete(false)
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
    {
      !isLogin 
      ?
      <Login user={user} setUser={setUser} getProducts={getProducts} isLogin={isLogin} setIsLogin={setIsLogin}></Login>
      :
      <div className="container mt-3">
        <div className='d-flex justify-content-between mb-3'>
          <h1 className='h3'>產品列表</h1>
          <button type='button' className='btn btn-primary' onClick={openAddModal}>新增產品</button>
          <ProductModal 
            addModalRef={addModalRef}
            addModal={addModal}
            product={product}
            setProduct={setProduct}
            products={products}
            setProducts={setProducts}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            getProducts={getProducts}
            pagination={pagination} />
        </div>
        <ProductList products={products} setProducts={setProducts} openEditModal={openEditModal} handleDelete={handleDelete} setProduct={setProduct} pagination={pagination} setPagination={setPagination}></ProductList>

        <Pagination pagination={pagination} getProducts={getProducts} />
      </div>
    }
    
    </>
  )
}

export default App
