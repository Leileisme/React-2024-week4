// 產品列表
const ProductList = ({products,openEditModal,handleDelete}) => {
  return(
    <>
      <table className='table'>
        <thead >
          <tr>
            <th scope='col'>產品名稱</th>
            <th scope='col'>標籤</th>
            <th scope='col'>原價</th>
            <th scope='col'>售價</th>
            <th scope='col'>是否啟用</th>
            <th scope='col'>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item,index)=>(
              <tr key={index}>
                <td>{item.title}</td>
                <td>
                  {
                    item.tags ? 
                    item.tags.map((tag)=>{
                      return(
                        <span className="badge text-bg-primary me-1" key={tag}>{tag}</span>
                      )
                    })
                    :
                    ''
                  }
                </td>
                
                
                <td>{item.origin_price}</td>
                <td>{item.price}</td>

                <td>
                {
                  item.is_enabled ? (
                    <span className='text-success' >啟用</span>
                  ) : (
                    <span>未啟用</span>
                  )
                }
                  </td>
                <td>
                  <button type='button' className='btn btn-outline-primary me-2' onClick={()=>{openEditModal(item)}}>編輯</button>
                  <button type='button' className='btn btn-outline-danger' onClick={(e)=>{
                    handleDelete(item.id,e)
                  }}>刪除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default ProductList