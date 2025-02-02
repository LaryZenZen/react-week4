function Pagination({
  pageInfo,
  handlePageChange
}){
  
  return (
    <>
        {/* 分頁 */}
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {/* 當沒有上一頁時呈現diasbled樣式 */}
              <li className={`page-item ${!pageInfo.has_pre && ' disabled'}`}>
                {/* 上一頁功能 */}
                <a onClick={()=>handlePageChange(pageInfo.current_page - 1)} className="page-link" href="#">
                  上一頁
                </a>
              </li>
              {/* 透過 Array.from 的技巧產生出對應長度的陣列 */}
              {Array.from({length: pageInfo.total_pages}).map((_,index)=>(
                // 判斷所在頁面並加上active樣式
                <li key={index} className={`page-item ${pageInfo.current_page === index+1 && 'active'}`}>
                <a onClick={()=>handlePageChange(index + 1)}
                className="page-link" href="#">
                  {index+1}
                </a>
              </li>
              ))}
              {/* 當沒有下一頁時呈現diasbled樣式 */}
              <li className={`page-item ${!pageInfo.has_next && ' disabled'}`}>
                {/* 下一頁功能 */}
                <a onClick={()=>handlePageChange(pageInfo.current_page + 1)} className="page-link" href="#">
                  下一頁
                </a>
              </li>
            </ul>
          </nav>
        </div>
    </>
  )
}

export default Pagination;