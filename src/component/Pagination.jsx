const Pagination=({pagination,getProducts})=>{

  return(<nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <a
          className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
          href='#'
          onClick={(e)=>{
            getProducts(e,pagination.current_page - 1)
          }}
          >上一頁</a>
      </li>
      {
        [...new Array(pagination.total_pages)].map((_,index)=>(
          <li className="page-item" key={index+1}>
            <a 
              className={`page-link ${index+1 === pagination.current_page && 'active'}`}
              href='#'
              onClick={(e)=> {
                getProducts(e,index+1)
              }}>{index+1}</a>
          </li>
        ))
      }
      <li className="page-item">
        <a
          className={`page-link ${pagination.has_next ? '' : 'disabled'}`} 
          href='#'
          onClick={(e)=>{
            getProducts(e,pagination.current_page + 1)
          }}
        >下一頁</a>
      </li>
    </ul>
  </nav>
  )
}

export default Pagination